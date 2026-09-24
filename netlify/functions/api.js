import 'dotenv/config';
import { refresh, getAqi } from '../../server.js';

export async function handler(event, context) {
  const url = new URL(event.rawUrl || `https://${event.headers.host}${event.path}`);
  if (url.pathname.endsWith('/aqi')) {
    const payload = await refresh('aqi', getAqi);
    return { statusCode: 200, body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } };
  }
  return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }), headers: { 'Content-Type': 'application/json' } };
}
