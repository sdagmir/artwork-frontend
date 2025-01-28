import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa"
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';
import {api_proxy_addr, img_proxy_addr, dest_root} from "./target_config"


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
        start_url: dest_root,
        scope: dest_root,
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
  base: dest_root,
  server: {
    host: true,
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')), 
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    proxy: {
      '/api': {
        target: api_proxy_addr, 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
      '/web-img': {
        target: img_proxy_addr, 
        changeOrigin: true,
        secure: false, 
      },
    },
  },
});