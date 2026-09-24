import 'dotenv/config';

const cache = new Map();
const CACHE_TTL = { aqi: 5 * 60 * 1000, traffic: 60 * 1000 };

function logUpstream(name, url) {
  console.info(`[upstream] ${name} ${url}`);
}

function normalize(sourceId, locationId, metricId, value, unit, timestamp) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return null;
  return {
    source_id: sourceId,
    location_id: locationId,
    metric_id: metricId,
    value: Number(value),
    unit,
    timestamp_utc: new Date(timestamp || Date.now()).toISOString()
  };
}

function dedupe(readings) {
  return [...new Map(readings.filter(Boolean).map(reading => [`${reading.source_id}|${reading.location_id}|${reading.metric_id}|${reading.timestamp_utc}`, reading])).values()];
}

async function fetchWithRetry(url, options = {}) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    try {
      logUpstream(options.name || 'upstream', url);
      const response = await fetch(url, { ...options, signal: controller.signal, headers: { accept: 'application/json', ...options.headers } });
      clearTimeout(timeout);
      if (response.ok) return await response.json();
      if (![429, 500, 502, 503, 504].includes(response.status)) throw new Error(`upstream ${response.status}`);
      lastError = new Error(`upstream ${response.status}`);
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;
    }
    await new Promise(resolve => setTimeout(resolve, 250 * 2 ** attempt));
  }
  throw lastError;
}

function cachedResponse(kind, error) {
  const previous = cache.get(kind);
  if (!previous) return { readings: [], stale: false, error: error.message };
  return { ...previous.payload, stale: true, error: error.message, cached_at: previous.cachedAt };
}

async function getAqi() {
  const locationId = process.env.AQI_LOCATION_ID || 'citypulse-demo';
  const lat = process.env.AQI_LAT || '42.365';
  const lon = process.env.AQI_LON || '-71.055';
  const timestamp = new Date().toISOString();

  if (process.env.WAQI_TOKEN && !process.env.WAQI_TOKEN.startsWith('replace_')) {
    const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${encodeURIComponent(process.env.WAQI_TOKEN)}`;
    const data = await fetchWithRetry(url, { name: 'waqi' });
    if (data.status !== 'ok') throw new Error(data.data || 'WAQI returned an error');
    const iaqi = data.data.iaqi || {};
    return {
      source: 'waqi',
      readings: dedupe([
        normalize('waqi', locationId, 'aqi', data.data.aqi, 'AQI', timestamp),
        normalize('waqi', locationId, 'pm2.5', iaqi.pm25?.v, 'µg/m³', timestamp),
        normalize('waqi', locationId, 'pm10', iaqi.pm10?.v, 'µg/m³', timestamp)
      ]),
      observed_at: timestamp
    };
  }

  const url = `https://api.openaq.org/v3/measurements?coordinates=${lat},${lon}&radius=25000&limit=100&order_by=datetime&sort_order=desc`;
  const headers = process.env.OPENAQ_API_KEY && !process.env.OPENAQ_API_KEY.startsWith('replace_') ? { 'X-API-Key': process.env.OPENAQ_API_KEY } : {};
  const data = await fetchWithRetry(url, { name: 'openaq', headers });
  const measurements = data.results || [];
  return {
    source: 'openaq',
    readings: dedupe(measurements.map(measurement => normalize('openaq', locationId, measurement.parameter?.name || measurement.parameter, measurement.value, measurement.unit, measurement.datetime?.utc || timestamp))),
    observed_at: timestamp
  };
}

async function getTraffic() {
  const locationId = process.env.TRAFFIC_LOCATION_ID || 'citypulse-demo';
  if (!process.env.TOMTOM_API_KEY || process.env.TOMTOM_API_KEY.startsWith('replace_')) throw new Error('TOMTOM_API_KEY is not configured');

  const point = `${process.env.AQI_LAT || '42.365'},${process.env.AQI_LON || '-71.055'}`;
  const flowUrl = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${point}&unit=KMPH&key=${encodeURIComponent(process.env.TOMTOM_API_KEY)}`;
  const incidentUrl = `https://api.tomtom.com/traffic/services/5/incidentDetails?bbox=${encodeURIComponent(process.env.TRAFFIC_BBOX || '-71.09,42.34,-71.02,42.39')}&fields={incidents{type,geometry{coordinates},properties{iconCategory,magnitudeOfDelay,events{description}}}}&language=en-GB&timeValidityFilter=present&key=${encodeURIComponent(process.env.TOMTOM_API_KEY)}`;

  const [flow, incidents] = await Promise.all([fetchWithRetry(flowUrl, { name: 'tomtom-flow' }), fetchWithRetry(incidentUrl, { name: 'tomtom-incidents' })]);
  const timestamp = new Date().toISOString();
  const flowData = flow.flowSegmentData || {};
  const readings = dedupe([
    normalize('tomtom', locationId, 'current_speed', flowData.currentSpeed, 'km/h', timestamp),
    normalize('tomtom', locationId, 'free_flow_speed', flowData.freeFlowSpeed, 'km/h', timestamp),
    normalize('tomtom', locationId, 'congestion_percent', flowData.currentSpeed && flowData.freeFlowSpeed ? (flowData.currentSpeed / flowData.freeFlowSpeed) * 100 : null, '% of free flow', timestamp),
    normalize('tomtom', locationId, 'incident_count', incidents.incidents?.length || 0, 'incidents', timestamp)
  ]);
  return { source: 'tomtom', readings, observed_at: timestamp };
}

async function refresh(kind, loader) {
  const existing = cache.get(kind);
  if (existing && Date.now() - existing.cachedAt < CACHE_TTL[kind]) return existing.payload;

  try {
    const payload = await loader();
    cache.set(kind, { payload: { ...payload, stale: false, cached_at: Date.now() }, cachedAt: Date.now() });
    return cache.get(kind).payload;
  } catch (error) {
    console.warn(`[cache] ${kind} fallback: ${error.message}`);
    return cachedResponse(kind, error);
  }
}

export { cache, refresh, getAqi, getTraffic, fetchWithRetry, normalize, dedupe, cachedResponse };
