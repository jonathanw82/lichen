# CLAUDE.md

Lichen marketing site (www.lichengrow.com). It's static HTML/CSS/JS with no build step and no framework.
The product itself (Django/React/daemon) lives in `~/Aura`.

## Deploy
- GitHub Pages via `.github/workflows/jekyll-gh-pages.yml`, triggered by a push to `main`. `CNAME` → `www.lichengrow.com`.
- Keep `sitemap.xml` in sync when you add or rename a page. `robots.txt` allows everything.
- Preview locally with `python3 -m http.server 8080` from the repo root. Check at phone width (360/390px) and desktop.

## Structure (easy to get wrong)
- **Pages live at the repo root**: `index.html`, `solutions.html`. Nav links are root-relative (`/solutions.html`, `/#contact`).
- `lichen-website/` holds **shared assets only**: `style.css`, `particles.js`, `assets/images/`, `emailjs-template.html`.
  Reference them with absolute paths (`/lichen-website/style.css`). Never put copies of the HTML pages in it.

## Positioning & style
- The audience is **commercial glasshouse and polytunnel growers**. Don't write home or hobby-grower copy. Cover both glasshouses and polytunnels.
- The layout is modelled on ostara.io: problem → how it works → benefits → solution tabs → FAQ.
- Palette: deep teal `#0b3d3f` / `#135c5e` with a warm amber `#f2994a` accent. Use the existing CSS variables in `style.css`.
- No horizontal scroll on mobile. The nav must fit at 360px.

## Images
- Process supplied photos with PIL: `.convert('RGB')`, `.thumbnail((1600,1600))`, then save as JPEG at quality 82–85 into
  `lichen-website/assets/images/`. Keep files small, because the site has no build pipeline to optimise them.
- App screenshots should be real Lichen UI captures, not mockups.
