export default {
  publicRuntimeConfig: {
    serverURL: process.env.NODE_ENV === 'production' ? process.env.SERVER_URL : 'http://127.0.0.1:8000',
    serverAPI: process.env.NODE_ENV === 'production' ? process.env.SERVER_API : 'http://127.0.0.1:8000/api',
  },

  // server: {
  //   host: '0.0.0.0'
  // },

  loading: {
    color: '#1f2937',
    height: '4px'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Chinaved – интернет магазин спецтехники по доступным ценам` : 'Chinaved – интернет магазин спецтехники по доступным ценам';
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://code.iconify.design/iconify-icon/1.0.0/iconify-icon.min.js'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/teleport.js'
    },
    {
      src: '~/plugins/filters.js'
    },
    {
      src: '~/plugins/table.js',
      ssr: false
    },
    {
      src: '~/plugins/vFocus.js',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxt/content',
    'portal-vue/nuxt',
    'unplugin-icons/nuxt',
    '@nuxt/image',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: 'XXXXXX',
        webvisor: true,
        // clickmap: true,
        // useCDN: false,
        // trackLinks: true,
        // accurateTrackBounce: true,
      }
    ],
    // [
    //   'nuxt-vuex-localstorage',
    //   {
    //     mode: 'debug',
    //     localStorage: ['products/basket', 'products/favorites']
    //   }
    // ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.SERVER_API,
    credentials: true
  },

  auth: {
    strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: process.env.SERVER_URL,
        endpoints: {
          login: {url: '/api/auth/login', method: 'post'},
          logout: {url: '/api/auth/logout', method: 'post'},
          user: {url: '/api/user', method: 'get'}
        },
        user: {
          property: 'data'
        },
        token: {
          property: 'token',
          global: true
        }
      }
    },
    redirect: {
      login: "/auth/login",
      logout: "/",
      callback: "/",
      home: "/"
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/.nuxt/dist/client',
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    loaders: {
      scss: {
        implementation: require('sass'),
      },
    }
  },
}
