import { defineConfig } from "vitest/config";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "logo.png", "icons/*.png"],

      manifest: {
        name: "Badilni — Skill Exchange Platform",
        short_name: "Badilni",
        description: "Exchange skills and services with your community.",
        theme_color: "#2F97E9",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/badilni-frontend/",
        start_url: "/badilni-frontend/",
        lang: "en",
        icons: [
          { src: "/badilni-frontend/icons/icon-72.png",  sizes: "72x72",   type: "image/png" },
          { src: "/badilni-frontend/icons/icon-96.png",  sizes: "96x96",   type: "image/png" },
          { src: "/badilni-frontend/icons/icon-128.png", sizes: "128x128", type: "image/png" },
          { src: "/badilni-frontend/icons/icon-144.png", sizes: "144x144", type: "image/png" },
          { src: "/badilni-frontend/icons/icon-152.png", sizes: "152x152", type: "image/png" },
          { src: "/badilni-frontend/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/badilni-frontend/icons/icon-384.png", sizes: "384x384", type: "image/png" },
          { src: "/badilni-frontend/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
        shortcuts: [
          { name: "Browse Offers",   short_name: "Offers",   url: "/badilni-frontend/offers",   icons: [{ src: "/badilni-frontend/icons/icon-96.png", sizes: "96x96" }] },
          { name: "Browse Requests", short_name: "Requests", url: "/badilni-frontend/requests", icons: [{ src: "/badilni-frontend/icons/icon-96.png", sizes: "96x96" }] },
          { name: "My Bookings",     short_name: "Bookings", url: "/badilni-frontend/bookings", icons: [{ src: "/badilni-frontend/icons/icon-96.png", sizes: "96x96" }] },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],

        navigateFallback: "/badilni-frontend/index.html",
        navigateFallbackDenylist: [/^\/api/],

        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\/api\/v1\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              expiration: { maxEntries: 100, maxAgeSeconds: 86400 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // Cloudinary images — long-lived, cache first
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "cloudinary-images",
              expiration: { maxEntries: 200, maxAgeSeconds: 86400 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // Other images
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-images",
              expiration: { maxEntries: 100, maxAgeSeconds: 86400 * 7 },
            },
          },
          // Google Fonts
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: { cacheName: "gfonts-css", expiration: { maxAgeSeconds: 86400 * 365 } },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gfonts-webfonts",
              expiration: { maxEntries: 30, maxAgeSeconds: 86400 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },

      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],

  base: "/badilni-frontend/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setupTests.js",
  },
});