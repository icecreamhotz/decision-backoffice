import colors from 'vuetify/lib/util/colors'

require("dotenv").config(); //eslint-disable-line

export default {
  mode: 'spa',
  dev: process.env.NODE_ENV !== 'production',
  env: {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    APP_NAME: process.env.APP_NAME,
    API_URL: process.env.API_URL,
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: process.env.APP_NAME,
    title: process.env.APP_NAME || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Decision'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  // https://nuxtjs.org/api/configuration-router#base
  router: {
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => ['script', 'style', 'font'].includes(type)
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/assets/scss/main.scss', lang: 'scss' },
    { src: '~/node_modules/@fortawesome/fontawesome-free/css/all.css' }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/bus',
    '~/plugins/axios',
    '~/plugins/vee-validate',
    { src: '~/plugins/croppie.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/global-components',
    ['@nuxtjs/eslint-module', { fix: true }],
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { filename: '.env' }],
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        }
      ]
    }]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    // customVariables: ['~/assets/scss/variables.scss'],
    defaultAssets: {
      font: false,
      icons: 'mdi'
    },
    icons: {
      iconfont: 'mdi'
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#ED5730',
          secondary: '#808080',
          success: '#3D9F8B',
          link: '#4AC0BB',
          muted: '#BFBFBF',
          danger: '#CF5362',
          warning: '#EBB35D',
          dark: '#282828',
          accent: colors.grey.darken3,
          info: colors.teal.lighten1,
          error: colors.deepOrange.accent4
        },
        options: {
          customProperties: true
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    // Add exception
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
    }
  }
}
