export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cccd',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  bootstrapVue: {
    icons: true
  },
  moment: {
    plugins: [
      'moment-lunar'
    ]

  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/veevalidator.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  buildModules: [
    ['nuxt-supabase', {
      //  supabaseUrl: `https://spbp.trinhminhbao.workers.dev`,
      supabaseUrl: 'https://ajsrzteoovahabndebyp.supabase.co',
      supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqc3J6dGVvb3ZhaGFibmRlYnlwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNDY4NjI1OCwiZXhwIjoyMDIwMjYyMjU4fQ.Q0lBT-HTcMLxLGpKgJ_-vz-prKH43nV9czOtm2HvMzU'
    }],
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

    transpile: ["vee-validate/dist/rules"],
    /*
    ** You can extend webpack config here
    */
    extend(config, { isClient }) {
      if (isClient)
        config.devtool = 'eval-source-map'
      else
        config.devtool = "inline-source-map"
    }
  },
}
