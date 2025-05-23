import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig((env) => ({
  base: "/cruise-drop-recording-app",
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: process.env.NODE_ENV === "development",
        type: "module",
      },
      registerType: "autoUpdate",
      injectRegister: null,
      strategies: "injectManifest",
      srcDir: "src",
      filename: "service-worker.js",
      includeAssets: ['noaafavicon.png', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        short_name: "Cruise-Drop-Recording-App",
        name: "Cruse-Drop-Recording-App",
        icons: [
          {
            src: "icons/radfish-144.ico",
            sizes: "144x144 64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "icons/radfish-144.ico",
            type: "image/icon",
            sizes: "144x144",
            purpose: "any",
          },
          {
            src: "icons/radfish-192.ico",
            type: "image/icon",
            sizes: "192x192",
            purpose: "any",
          },
          {
            src: "icons/radfish-512.ico",
            type: "image/icon",
            sizes: "512x512",
            purpose: "any",
          },
          {
            src: "icons/144.png",
            type: "image/png",
            sizes: "144x144",
            purpose: "any",
          },
          {
            src: "icons/144.png",
            type: "image/png",
            sizes: "144x144",
            purpose: "maskable",
          },
          {
            src: "icons/192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "icons/512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
        start_url: "/cruise-drop-recording-app/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
      },
    }),
  ],
  server: {
    open: false,
    port: 3001,
    host: true
  },
  test: {
    globals: true,
    setupFiles: "./src/__tests__/setup.js",
    environment: "jsdom",
  },
}));
