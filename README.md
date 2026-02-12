# [dersu.space](https://dersu.space/)

A static multi-page website for musician Dersu Doğan, built with Vite.

## Architecture

- **Vite** — dev server with HMR + production build (`dist/`)
- **Multi-page app** — each page is a standalone HTML entry point (`index.html`, `about.html`, `portfolio.html`, `link.html`, `soon.html`)
- **Static assets** live in `public/` and are copied to `dist/` as-is (no bundling)
- **Clean URLs** — `/about` instead of `/about.html`; Vite dev plugin handles it locally, Apache `.htaccess` + folder-based `index.html` structure handles it in production (no trailing slashes)
- **Particles.js** — animated particle background on most pages, configured inline in `js/app.js`
- **Bootstrap 4** + jQuery + Popper.js — vendored locally
- **Font Awesome 5** — loaded from CDN

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
│   ├── css/            # Bootstrap, custom styles
│   ├── js/             # Particles.js, app.js, jQuery, Bootstrap, Popper
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

- All vendored libraries (jQuery, Bootstrap, Particles.js) are in `public/` so Vite serves them without processing — avoids bundling issues with legacy scripts
- HTML files remain at root level as Vite MPA entry points; on build, they are restructured into `page/index.html` folders for clean URLs without server-side rewrites
- Apache `.htaccess` disables `DirectorySlash` and strips trailing slashes so URLs stay as `/about` (not `/about/`)
- No templating or component extraction — pages share copy-pasted markup to keep the migration minimal
