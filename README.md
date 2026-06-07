# Loy Family Lights Website

Static website for loyfamilylights.com, ready for Cloudflare Pages + GitHub.

## Cloudflare Pages settings

- Framework preset: None
- Build command: leave blank
- Build output directory: `/`
- Production branch: `main`

## File structure

```text
/
├─ index.html
├─ schedule.html
├─ visit.html
├─ watch.html
└─ assets/
   ├─ css/
   │  └─ styles.css
   └─ js/
      └─ app.js
```

## After uploading to GitHub

1. In Cloudflare, go to Workers & Pages.
2. Create a Pages project.
3. Connect the GitHub repository.
4. Use the settings above.
5. Add custom domains:
   - loyfamilylights.com
   - www.loyfamilylights.com
