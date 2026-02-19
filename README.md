# [dersu.space](https://dersu.space/)

A static multi-page website for musician Dersu Doğan, built with Vite.

## Architecture

- **Vite** — dev server with HMR + production build (`dist/`)
- **Multi-page app** — each page is a standalone HTML entry point (`index.html`, `about.html`, `portfolio.html`, `link.html`, `soon.html`)
- **Static assets** live in `public/` and are copied to `dist/` as-is (no bundling)
- **Clean URLs** — `/about` instead of `/about.html`; Vite dev plugin handles it locally, Apache `.htaccess` + folder-based `index.html` structure handles it in production (no trailing slashes)
- **Particles.js** — animated particle background on most pages, configured inline in `js/app.js`; particle count is reduced on mobile (<768px) for performance
- **Font Awesome 5** — loaded from CDN
- **Responsive** — desktop-first approach with two breakpoints (768px tablet, 480px phone); no CSS framework dependency

## Project Structure

```
├── index.html          # Home page (Vite entry)
├── about.html          # About page
├── portfolio.html      # Portfolio — Spotify, YouTube, SoundCloud embeds
├── link.html           # External links
├── soon.html           # Placeholder page
├── vite.config.js      # Vite MPA config + clean URL plugin
├── package.json
├── public/
│   ├── .htaccess       # Apache rewrite rules for clean URLs
│   ├── css/            # Custom styles (style.css, about.css, portfolio.css)
│   ├── js/             # Particles.js, app.js
│   ├── fonts/          # Quinn, Roboto Condensed
│   └── images/         # SVG logo / favicon
```

## Setup

```sh
npm install
```

## Development

```sh
npm run dev       # Start dev server (localhost:5173)
```

Clean URLs (`/about`, `/link`, `/portfolio`, `/soon`) work in dev via a custom Vite middleware.

## Build & Deploy

```sh
npm run build     # Output to dist/
npm run preview   # Preview production build locally
```

Upload the contents of `dist/` to your web server's `httpdocs/` directory (e.g. via Cyberduck/FTP). Make sure hidden files are visible in Cyberduck (View → Show Hidden Files) so `.htaccess` gets uploaded.

The build output uses a folder structure for clean URLs:

```
dist/
├── index.html              # /
├── about/index.html        # /about
├── link/index.html         # /link
├── portfolio/index.html    # /portfolio
├── soon/index.html         # /soon
├── .htaccess               # Strips trailing slashes, redirects .html URLs
├── css/
├── js/
├── fonts/
└── images/
```

## Design Decisions

- **Bootstrap removed** — Bootstrap 4, jQuery, and Popper.js were vendored but unused (only `navbar-brand` referenced). Replaced with lean standalone CSS rules including a `box-sizing: border-box` and `margin: 0` reset. The vendored files remain in `public/` but are no longer loaded by any page
- **Desktop-first responsive** — two breakpoints: 768px (tablet) and 480px (phone). All three CSS files (`style.css`, `about.css`, `portfolio.css`) use standard `max-width` media queries; the previous deprecated `min-device-width`/`max-device-width` syntax was removed
- **Slide-out navigation** — desktop slides 25% revealing the nav panel; tablet slides 50%; phone slides 75% to maximize nav space on small screens
- **Particles.js mobile optimization** — particle count reduced from 200 to 80 on screens < 768px for better performance on mobile devices. No other particles.js config is changed; the canvas auto-resizes via the library's built-in resize handler
- **Fluid embeds** — YouTube iframes use `aspect-ratio` + `max-width` instead of hardcoded `width`/`height` HTML attributes, so they scale down on small screens
- **About page** — biography text uses generous `rem`-based font sizes (1.15rem desktop, 0.95rem phone) with good line-height for readability; scrollable via `overflow-y: auto` on short viewports
- **Content overflow safety** — `overflow-x: hidden` on body prevents horizontal scroll; the about biography block has `max-height: 85vh; overflow-y: auto` for long content on short viewports
- **Portfolio standalone** — portfolio.html has its own CSS and does not share the slide-out nav; the brand link navigates back to the main site
- All vendored libraries (Particles.js) are in `public/` so Vite serves them without processing — avoids bundling issues with legacy scripts
- HTML files remain at root level as Vite MPA entry points; on build, they are restructured into `page/index.html` folders for clean URLs without server-side rewrites
- Apache `.htaccess` disables `DirectorySlash` and strips trailing slashes so URLs stay as `/about` (not `/about/`)
- No templating or component extraction — pages share copy-pasted markup to keep the migration minimal
- All HTML and CSS files are consistently formatted (2-space indentation) with descriptive section comments for maintainability
