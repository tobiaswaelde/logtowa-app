// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: { enabled: true },
  },
  srcDir: 'src/',
  nitro: {
    preset: 'node-server',
  },
  components: [{ path: '~/components', pathPrefix: false }],
  modules: [
    ['@nuxtjs/robots', { rules: { UserAgent: '', Disallow: '*' } }],
    [
      '@pinia/nuxt',
      { autoImports: ['defineStore', ['defineStore', 'definePiniaStore']] },
    ],
  ],
  css: ['vuetify/styles/main.sass', '~/styles/main.scss'],
  build: {
    transpile: ['vuetify'],
  },
  imports: {
    dirs: ['./stores'],
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      apiToken: process.env.API_TOKEN,
      socketToken: process.env.SOCKET_TOKEN,
    },
  },
});
