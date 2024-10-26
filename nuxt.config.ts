import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.webp' }],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/styles/_colors.scss" as *; @use "~/assets/styles/_variables.scss" as *; @use "~/assets/styles/_text.scss" as *;',
        },
      },
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/leaflet'],
  routeRules: {
    '/woningen': { ssr: false },
  },
  leaflet: {
    markerCluster: true,
  },
});
