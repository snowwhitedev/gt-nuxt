import webpack from 'webpack';
require('dotenv').config();
const categories = [
  'flower',
  'vapes',
  'vapes',
  'prerolls',
  'extracts',
  'edibles',
  'accessories'
];
export default {
  ssr: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'gt-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700,900'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/scss/style.css',
    '~assets/scss/transition.css',
    '~assets/mockup/global/variables.scss',
    '~assets/mockup/global/mockstyle.scss'
  ],

  styleResources: {
    scss: ['./assets/mockup/global/variables.scss']
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/globalUse.js',
    { src: '~plugins/globalClientUse', mode: 'client' },
    '~plugins/globalComponent.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy'
  ],

  bootstrapVue: {
    componentPlugins: ['TablePlugin', 'CardPlugin'],
    components: [
      'BOverlay',
      'BFormInput',
      'BFormCheckbox',
      'BInputGroup',
      'BInputGroupText',
      'BFormDatepicker',
      'BButton',
      'BCollapse',
      'BFormSelect',
      'BInputGroupAppend',
      'VBToggle',
      'BTime',
      'BIcon',
      'BIconCheckCircle',
      'BIconXCircle'
    ]
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash'
      })
    ]
  },

  proxy: {
    '/api': {
      target: process.env.API_BASE_URL,
      pathRewrite: {
        '^/api': '/'
      }
    }
  },

  router: {
    middleware: ['check-auth', 'initProducts']
  },

  generate: {
    fallback: true,
    routes: categories.map((cat) => {
      return `/products/${cat}`;
    })
  }
};
