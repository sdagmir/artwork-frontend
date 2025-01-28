import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa"
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';


export default defineConfig({
  plugins: [
    mkcert(),
    react(), 
    VitePWA({
      registerType: 'autoUpdate', 
      devOptions: {
        enabled: true, 
      },
      manifest: {
        name: 'История Живописи',
        short_name: 'Живопись',
        start_url: "/artwork-frontend",
        scope: "/artwork-frontend",
        display: 'standalone',
        background_color: '#2B1E11', 
        theme_color: '#A26907', 
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'icon192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'icon512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
  base: '/artwork-frontend',
  server: {
    host: true,
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')), 
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    proxy: {
      '/api': {
        target: 'http://192.168.0.105:8000', 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
      '/web-img': {
        target: 'http://192.168.0.105:9000', 
        changeOrigin: true,
        secure: false, 
      },
    },
  },
});