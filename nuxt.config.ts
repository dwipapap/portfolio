// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    // @ts-expect-error process is not typed
    malClientId: process.env.MAL_CLIENT_ID,
    public: {
      // @ts-expect-error process is not typed
      malUsername: process.env.MAL_USERNAME
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@vercel/analytics'
  ],
  vite: {
    optimizeDeps: {
      exclude: ['@nuxt/hints', '#shared/hints-config']
    }
  }
})