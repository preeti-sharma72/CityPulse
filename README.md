# CityPulse MVP

The original Stitch exports remain in their own folders. This MVP entry point is `index.html` and keeps the same dark telemetry visual language while adding reusable civic issue rendering, filters, demo map markers, report submission, and Supabase Realtime support.

## Run

The live AQI and traffic panels require the small Node proxy. From this folder:

```powershell
npm install
Copy-Item .env.example .env
npm start
```

Open `http://localhost:3000`. The browser never receives the upstream API keys. The proxy uses WAQI first and OpenAQ when `WAQI_TOKEN` is unavailable; traffic uses TomTom Flow and Incident Details.

The proxy caches AQI for 5 minutes and traffic for 1 minute, retries upstream calls with timeout/backoff, serves the last cached payload during upstream errors or rate limits, logs each upstream call, and broadcasts changes over `/api/stream` using Server-Sent Events. The browser closes the stream while its tab is hidden.

For a deliberate cache-fallback check, start the server with valid credentials, request `/api/aqi` or `/api/traffic`, then temporarily use an invalid upstream key and request the same endpoint before its cache expires. The response will contain `stale: true` and `cached_at` while retaining the previous readings.

## Environment variables

Copy `.env.example` to `.env` and add `WAQI_TOKEN` and `TOMTOM_API_KEY`. `OPENAQ_API_KEY` is optional for the fallback provider. Keep `.env` uncommitted; it is covered by `.gitignore`. The remaining values identify the demo coordinate and can be adjusted for the target city.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase_schema.sql` in the Supabase SQL editor.
3. Before loading `index.html`, define the public browser-safe values:

```html
<script>
  window.CITYPULSE_SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
  window.CITYPULSE_SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
</script>
```

Place that script before `app.js`. Never put a Supabase service-role key in browser code. Replace the placeholder values before using Supabase; the existing dashboard issue stream remains in local demo mode otherwise.

## Files

- `index.html`: dashboard shell, filters, map section, and report dialog.
- `styles.css`: Stitch-compatible telemetry styling and responsive layout.
- `app.js`: demo data, Supabase loading/realtime subscription, rendering, filtering, and submissions.
- `supabase_schema.sql`: civic issue table, constraints, RLS read/insert policies, and realtime publication.
- `server.js`: server-only AQI and TomTom proxy, cache, retries, normalization, and SSE stream.
- `.env.example`: required server configuration template.
- `.gitignore`: excludes `.env` and installed dependencies.
