# CityPulse MVP

The original Stitch exports remain in their own folders. This MVP entry point is `index.html` and keeps the same dark telemetry visual language while adding reusable civic issue rendering, filters, demo map markers, report submission, and Supabase Realtime support.

## Run

The live AQI panel requires the small Node proxy. From this folder:

```powershell
npm install
Copy-Item .env.example .env
npm start
```

Open `http://localhost:3000`. The browser never receives the upstream API keys. The proxy uses WAQI first, OpenAQ when configured, and public Open-Meteo air quality as a no-key fallback.

The proxy caches AQI for 5 minutes, retries upstream calls with timeout/backoff, serves the last cached payload during upstream errors or rate limits, logs each upstream call, and broadcasts changes over `/api/stream` using Server-Sent Events. The browser closes the stream while its tab is hidden.

For a deliberate cache-fallback check, start the server with valid credentials, request `/api/aqi`, then temporarily use an invalid upstream key and request the same endpoint before its cache expires. The response will contain `stale: true` and `cached_at` while retaining the previous readings.

## Environment variables

Copy `.env.example` to `.env` and add `WAQI_TOKEN` for provider-backed readings. `OPENAQ_API_KEY` is optional. Without an AQI key, the dashboard uses Open-Meteo. Keep `.env` uncommitted; it is covered by `.gitignore`. The remaining values identify the demo coordinate and can be adjusted for the target city.

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

## Deploy to Vercel or Netlify

### Vercel

1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Keep the default framework as `Other` or static deployment.
4. Set environment variables in the Vercel dashboard:
   - `WAQI_TOKEN`
   - `AQI_LAT`
   - `AQI_LON`
   - `PORT=3000` (optional for local compatibility)
5. Use the root folder as the project root.
6. Deploy. Vercel will serve the static page and the `/api/*` functions from the project.

### Netlify

1. Push this folder to GitHub.
2. Import the repo in Netlify.
3. Set the publish directory to the project root.
4. Add the same environment variables as above in Netlify > Site configuration > Environment variables.
5. Deploy. Netlify routes `/api/*` to the functions automatically via `netlify.toml`.

The UI will automatically use the Netlify function URL when `window.location.hostname` contains `netlify.app`, and the normal `/api` path elsewhere.

## Files

- `index.html`: dashboard shell, filters, map section, and report dialog.
- `styles.css`: Stitch-compatible telemetry styling and responsive layout.
- `app.js`: demo data, Supabase loading/realtime subscription, rendering, filtering, and submissions.
- `supabase_schema.sql`: civic issue table, constraints, RLS read/insert policies, and realtime publication.
- `server.js`: server-only AQI proxy, cache, retries, normalization, and SSE stream.
- `.env.example`: required server configuration template.
- `.gitignore`: excludes `.env` and installed dependencies.
