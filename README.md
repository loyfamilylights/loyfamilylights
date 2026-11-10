# Loy Family Lights — v3.0 · GitHub Pages

Website: https://loyfamilylights.github.io/loyfamilylights/

## Deploy

1. Extract the **contents** of this ZIP (not the ZIP as a single uploaded file).
2. In https://github.com/loyfamilylights/loyfamilylights, upload/replace `index.html`, `config.js`, `assets/`, `data/`, `.nojekyll`, and `.github/` directly at repository root; preserve subfolders.
3. Commit to `main`. Under Settings → Pages, choose **GitHub Actions** if using the included workflow. If using branch-based deployment instead, select `main` / `(root)` and remove the workflow if not needed.
4. Open the website and hard-refresh (Ctrl+Shift+R).

## Edit show details

Open `config.js` in GitHub and change the placeholders for FM frequency, viewing location, dates/hours, playlists and announcements. **The shipped hours are examples, not confirmed schedule.** The HTML contains fallback defaults to keep the page styled even if config.js is missing; config.js overrides them when present.

## v3.0 features

- Your v2-style navy/gold/red responsive design and Christmas/Halloween switch.
- Animated decorative snow with on/off button and reduced-motion support.
- Show Center with Now Playing/Up Next, a manual refresh control and stale-feed guard.
- Seasonal playlists, featured song and optional Remote Falcon visitor request link.
- Kids’ mini light lab and local-device-only favorite song picker.
- Expanded seasonal discovery, Behind the Lights cards, customizable visitor note and visitor FAQ.
- Example social share artwork, responsive navigation and built-in CSS/JS.

## Live FPP status — optional, not automatically active

The site is **static** and cannot connect to your LAN-only FPP controllers (`192.168.x.x`). Do **not** forward FPP ports or publish credentials. Set `statusJsonUrl` to a publicly accessible, read-only HTTPS JSON feed managed by your own secure relay. Sample schema:

```json
{"status":"live","nowPlaying":"The Bells of Christmas Thunder","upNext":"The Greatest Night of the Year","updatedAt":"2026-12-01T19:05:00-05:00"}
```

Allowed status values: `live`, `scheduled`, `paused`, `cancelled`, `offseason`. The timestamp must be updated whenever the snapshot is published; stale data falls back to preview mode. Configure `statusMaxAgeMinutes` and `statusRefreshSeconds` as needed. Host the JSON at `data/show-status.json` on GitHub Pages or another HTTPS endpoint with the appropriate CORS policy. **GitHub Pages alone does not update status data automatically**: a separate secure updater/relay must publish fresh JSON; GitHub Actions or another authorized process may be used. The bundled example isn't referenced and has an intentionally invalid timestamp.

## Remote Falcon

Set `remoteFalconUrl` to your public Remote Falcon visitor URL. The website opens it, rather than submitting requests directly. If empty, it shows “coming soon.”

## Security and privacy

This site does not include backend voting, guestbook submissions, account login, or FPP command endpoints. Favorites and theme choices stay only in each visitor's browser. No public credentials, network control, or secret keys belong in `config.js`.

## Inspiration and licensing

This is an independent static design for Loy Family Lights, adapted conceptually from your Marquee Festive WordPress theme; it does not run WordPress PHP or require plugins. New v3 features use custom HTML/CSS/JS. The original uploaded WordPress ZIP is not required on GitHub Pages.
