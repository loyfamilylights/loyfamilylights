# Loy Family Lights — GitHub Pages (fixed v1.1)

**Fix for the unstyled page shown in your screenshot:** `index.html` now contains all its CSS and interactive JavaScript. Even if you upload just `index.html`, the design will render, including the holiday theme and light controls. Upload `config.js` too to customize the show settings; the page has built-in defaults if that file is missing.

If your page still looks unstyled, open the actual published GitHub Pages URL (not GitHub's source preview), then hard refresh with Ctrl+F5. Check **Settings → Pages** and wait for the deployment workflow to succeed.

## Quick fix on GitHub
1. Unzip the package.
2. Replace your existing repository-root `index.html` with this version.
3. Upload the other files, preserving `assets/` and `.github/workflows/` folder names.
4. Commit changes and open **Actions → Deploy GitHub Pages** to confirm success.
5. Open `https://YOURUSERNAME.github.io/YOURREPOSITORY/` and use Ctrl+F5.

**Customization:** Edit `config.js`. Keep the page's inline scripts in place; the external config is loaded before the bundled app runs at the bottom of the page.

---

# Loy Family Lights — GitHub Pages website

A new, independently implemented static holiday show site inspired by the feature ideas in the Marquee 0.20.4 WordPress project. No WordPress, PHP, Node or build process required.

## Preview

Open `index.html` in a browser, or run `python -m http.server 8080` from this folder and visit http://localhost:8080. An HTTP server is required for the optional live JSON fetch to work reliably.

## Publish to GitHub Pages

1. Sign into GitHub and create a **public repository** such as `loy-family-lights`.
2. Upload all files **inside** this folder to the **root of the repository** (not the folder itself), including the `.github` directory, `config.js`, `index.html`, and `assets`.
3. Make sure your default branch is named `main` (or adjust `.github/workflows/pages.yml`).
4. In your GitHub repository open **Settings → Pages**, and under **Build and deployment → Source** choose **GitHub Actions**.
5. The included workflow deploys automatically after a push to `main`, and the URL appears on **Settings → Pages**. For example: `https://YOURUSERNAME.github.io/loy-family-lights/`.
6. Edit `config.js`, commit your changes and GitHub will republish your site.

The site uses relative file paths, so it works at both project and custom-domain URLs.

## Customize your show

Only edit `config.js` for most settings:

| Setting | What it does |
|---|---|
| `station` | Set your real radio frequency (default is a placeholder) |
| `locationLabel` / `address` | Public location and optional Google Maps directions |
| `schedule`, `seasonStart`, `seasonEnd` | **Sample schedule only**: change to real show hours and dates |
| `status` | Owner-selected show status: `scheduled`, `live`, `paused`, `cancelled` or `offseason` |
| `announcement` | Alert banner text |
| `remoteFalconUrl` | Public song-request/voting page (no secret tokens) |
| `playlist`, `halloweenPlaylist` | Your songs and genres |
| `facebookUrl`, `youtubeUrl`, `instagramUrl`, `donationUrl` | Optional public links |
| `season` | Start in `christmas` or `halloween` theme |
| `statusJsonUrl` | Optional public JSON file showing show status and current song |

**Before announcing your site:** update the example show hours, radio frequency, viewing address, and playlist. The sample songs are demonstration entries, not a claim that these songs are available on your active FPP.

## Optional status feed

GitHub Pages itself cannot directly query your FPP device at a private network address (such as `192.168.1.x`). For live data you can publish an intentionally public **read-only snapshot** from a secure external process (e.g. a GitHub Actions or serverless automation). The browser can then read it from a public URL in `statusJsonUrl`. **Never** publish FPP credentials, your internal IPs, Remote Falcon API keys, or unrestricted device controls.

Example JSON:

```json
{
  "status": "live",
  "nowPlaying": "The Bells of Christmas Thunder",
  "upNext": "The Greatest Night of the Year",
  "updatedAt": "2026-12-01T18:00:00-05:00"
}
```

`updatedAt` must be recent (within ~5 refresh intervals) so stale data will not present a show as live. A remote feed must permit browser cross-origin reads (CORS), or you can host the JSON on the same GitHub Pages site. The site does **not** include a publisher: configure one separately if you need this feature.

## Features and limitations

**Works on GitHub Pages:** responsive seasonal design, manual show status, countdown, show schedule, visitor information, featured/playlist songs, custom external song request link, theme toggle, Kids' Light Lab (interactive), and on-device favorite selection.

**Needs a backend/third-party service:** true real-time Now Playing, collective visitor song voting, public guestbook, notifications, live camera, or approved "Name in Lights" messages sent to FPP. These are **not implemented** in the static site. Favorite song selections are stored in each visitor's own browser, not shared with the owner or other visitors. The Name in Lights panel is an informational placeholder, not a form.

**Safety and privacy:** Do not expose a private FPP instance or its credentials on a public GitHub site. Any future names/picture submission feature should have parental oversight, moderation and rate limiting before connecting to your displays.

## Attribution

This is an original static front-end inspired by high-level ideas from `marquee-0.20.4.zip`, not a port or redistribution of its WordPress plugin. The Marquee source describes its license as GPLv2 or later. No Marquee source files or artwork have been copied into this project.
