# [dersu.space](https://dersu.space/)

A static multi-page website for musician Dersu Doğan, built with Vite.

## Architecture

- **Vite** — dev server with HMR + production build (`dist/`)
- **Multi-page app** — each page is a standalone HTML entry point (`index.html`, `about.html`, `portfolio.html`, `link.html`, `soon.html`)
- **Static assets** live in `public/` and are copied to `dist/` as-is (no bundling)
- **Clean URLs** — `/about` instead of `/about.html`, handled by a Vite dev plugin + Apache `.htaccess` in production
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

Upload the contents of `dist/` to your web server's `httpdocs/` directory (e.g. via Cyberduck/FTP). The `.htaccess` file handles clean URL rewrites on Apache.

## Design Decisions

- All vendored libraries (jQuery, Bootstrap, Particles.js) are in `public/` so Vite serves them without processing — avoids bundling issues with legacy scripts
- HTML files remain at root level as Vite MPA entry points rather than being restructured into folders
- No templating or component extraction — pages share copy-pasted markup to keep the migration minimal
