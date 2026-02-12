import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        link: resolve(__dirname, 'link.html'),
        soon: resolve(__dirname, 'soon.html'),
      },
    },
  },
  plugins: [
    {
      name: 'clean-urls',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Rewrite /about → /about.html etc. for dev server
          const cleanUrls = ['/about', '/portfolio', '/link', '/soon']
          if (cleanUrls.includes(req.url)) {
            req.url = req.url + '.html'
          }
          next()
        })
      },
    },
  ],
})
