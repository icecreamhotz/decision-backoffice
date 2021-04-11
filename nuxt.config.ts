export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  env: {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    FRONT_URL: process.env.FRONT_URL,
    LIFF_URL: process.env.LIFF_URL,
    LINE_REDIRECT_URL: process.env.LINE_REDIRECT_URL,
    LINE_CLIENT_ID: process.env.LINE_CLIENT_ID,
    LINE_STATE: process.env.LINE_STATE,
    GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY
  },

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'dist',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Coconutt.',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'แฟลตฟอร์มสำหรับการนัดหมายผ่าน LINE OFFICIAL ACCOUNT by COconutt  เหมาะสำหรับธุรกิจหลากหลายประเภท ช่วยคุณจัดการนัดหมายและจัดการเวลาการให้บริการ ช่วยให้ลูกค้าของคุณสะดวกกับการวางแผนล่วงหน้า หรือปรับแผนการนัดหมายได้โดยไม่ต้องติดตั้ง Application เพิ่มเติม' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vee-validate.ts',
    '~/plugins/inject.ts',
    '~/plugins/axios',
    '~/plugins/vue-google-map',
    '~/plugins/vue-timepicker',
    '~/plugins/vue-croppie',
    '~/plugins/vue-multiselect'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api',
    '@nuxtjs/axios'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-i18n',
    '@nuxtjs/dayjs',
    '@nuxtjs/axios'
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#007680',
          accent: '#9FAEE5',
          secondary: '#BBC592',
          info: '9CDBD9',
          warning: '#EBBB13',
          error: '#DB5C5C',
          success: '#187A41'
        }
      }
    },
    treeShake: true
  },

  axios: {
    baseURL: process.env.API_URL
  },

  i18n: {
    locales: ['th', 'en'],
    defaultLocale: 'th',
    parsePages: false,
    encodePaths: false,
    pages: require('./assets/constants/route/pages.js'),
    vueI18n: {
      fallbackLocale: 'th',
      messages: {
        th: require('./assets/constants/lang/th.js'),
        en: require('./assets/constants/lang/en.js')
      }
    },
    detectBrowserLanguage: false
  },

  dayjs: {
    locales: ['th', 'en'],
    defaultLocale: 'th'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    transpile: [
      'vee-validate/dist/rules',
      /^vue2-google-maps($|\/)/
    ]
  }
}
