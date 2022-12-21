<script>
import p from '@/package.json'
import {debounce} from "~/helpers";

export default {
  computed: {
    name() {
      return p.name
    },
    // showDrawer: {
    //   get() {
    //     return this.$store.state.app.navbar.showDrawer
    //   },
    //   async set(value) {
    //     await this.$store.dispatch('app/setNavbarShowDrawer', value)
    //   }
    // },
    showOptions: {
      get() {
        return this.$store.state.app.navbar.showOptions
      },
      async set(value) {
        await this.$store.dispatch('app/setNavbarShowOptions', value)
      },
    },
  },
  watch: {
    $route() {
      this.searchOverlayOn = false
      this.search = ''
      this.searchResult = []
    },
    searchOverlayOn: function (value) {
      value ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
    }
  },
  data() {
    return {
      searchOverlayOn: false,
      search: '',
      searchResult: [],
    }
  },
  methods: {
    updateDrawerOptions() {
      if (this.showOptions) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    },
    async openSearch() {
      this.searchOverlayOn = true
    },
    toggleOptions(show) {
      this.showOptions = show
      this.updateDrawerOptions()
    },
    searchResponse: debounce(async function () {
      if (this.search.length <= 2) {
        this.searchResult = []
        return
      }
      const response = await this.$axios.get(`/products?search=${this.search}`)
      this.searchResult = await response.data.data
    }, 300),
    keyup(e) {
      if(e.keyCode === 27) {
        this.searchOverlayOn = false
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', this.keyup)
  },
  destroyed() {
    window.removeEventListener('keyup', this.keyup)
  }
}
</script>

<template>
  <div
    ref="navbar"
    class="backdrop-filter backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-900/10 dark:border-gray-50/20 bg-white/50 dark:bg-slate-900/50 sticky"
  >
    <div id="navbar-banner" class="banner">
      <slot name="banner" />
    </div>
    <div class="max-w-8xl w-full mx-auto">
      <div class="py-3 lg:px-8 mx-4 lg:mx-0">
        <div class="relative flex items-center">
          <slot name="title">
            <NuxtLink
              tag="a"
              class="mr-3 flex gap-x-2 overflow-hidden md:w-auto text-md font-bold text-gray-900 dark:text-gray-200"
              :to="{ name: 'index' }"
            >
              <img src="/logo.svg" width="32" />
              <span class="sr-only">На главную</span>
              <span class="flex items-center">
                {{ name }}
              </span>
            </NuxtLink>
          </slot>

          <!-- menu -->
          <slot name="menu" />

          <!-- options:toggle -->
          <div class="grow md:grow-0 flex justify-end items-center gap-x-4">

            <button
              class="flex items-center focus:outline-none"
              aria-label="To Search Page"
              @click="openSearch"
            >
            <span
              class="flex items-center text-gray-600 dark:text-gray-300"
            >
              <iconify-icon icon="charm:search" class="text-xl" />
            </span>
            </button>

            <Portal to="app-after">
              <Transition name="animation-search-panel">
                <div
                  v-if="searchOverlayOn"
                  class="fixed inset-0 bg-dark/95 backdrop-filter backdrop-blur-md z-50 h-screen w-screen"
                >
                  <div class="w-full h-full max-h-screen mx-auto">
                    <div class="max-w-8xl absolute top-6 bottom-6 lg:top-10 lg:bottom-10 lg:left-8 lg:right-8 px-4 w-full lg:w-auto lg:mx-auto">
                      <div class="grid">
                        <div class="flex justify-between items-center text-white">
                          <h1>Поиск по каталогу</h1>
                          <button
                            class="flex justify-center items-center"
                            @click="searchOverlayOn = false"
                          >
                            <iconify-icon
                              icon="mdi:window-close"
                              width="22"
                              height="22"
                            ></iconify-icon>
                          </button>
                        </div>
                        <div class="mt-8">
                          <input
                            v-focus
                            @input="searchResponse"
                            v-model="search"
                            type="text"
                            name="searchQuery"
                            class="text-white border-b border-white focus:border-primary-500 bg-transparent w-full placeholder-neutral-200 outline-none pb-1.5"
                            placeholder="Введите наименование или артикул"
                          />
                        </div>
                        <div class="my-8" v-if="searchResult.length">
                          <div class="grid md:grid-cols-2 items-start lg:grid-cols-4 gap-y-4 gap-x-4 h-[calc(100vh-14rem)] overscroll-y-contain overflow-y-auto scrollbar-hide lg:scrollbar-default">
                            <LazyCatalogItem v-for="(item, index) in searchResult" :key="index" :product="item" />
                          </div>
                        </div>
                        <!--                      <div class="mt-2" v-if="searchResult.length > 4">-->
                        <!--                        <LazyAnchor-->
                        <!--                          :to="{ name: 'search' }"-->
                        <!--                          text="Посмотреть все"-->
                        <!--                          class="text-white"-->
                        <!--                        >-->
                        <!--                          <template #suffix>-->
                        <!--                            <iconify-icon-->
                        <!--                              icon="material-symbols:arrow-forward-rounded"-->
                        <!--                            ></iconify-icon>-->
                        <!--                          </template>-->
                        <!--                        </LazyAnchor>-->
                        <!--                      </div>-->
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </Portal>

            <button
              class="flex items-center focus:outline-none md:hidden"
              aria-label="Toggle Options Menu"
              @click="toggleOptions(true)"
            >
              <span
                class="flex items-center text-gray-600 dark:text-gray-300"
                aria-hidden="true"
              >
                <iconify-icon icon="charm:menu-hamburger" class="text-xl" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <ClientOnly>
      <Portal to="app-after">
        <div>
          <ActionSheetOverlay v-show="showOptions" @click="toggleOptions(false)"/>
          <slot
            name="options"
            :toggle-options="toggleOptions"
            :show-options="showOptions"
          />
        </div>
      </Portal>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.animation-search-panel-enter-active,
.animation-search-panel-leave-active {
  @apply transition-opacity ease-linear duration-150;
}

.animation-search-panel-enter,
.animation-search-panel-leave-to {
  @apply opacity-0;
}

.animation-search-panel-enter-to,
.animation-search-panel-leave {
  @apply opacity-100;
}

a.router-link-active {
  font-weight: bold;
}

a.router-link-exact-active {
  color: theme('colors.slate.900');
}

html.dark {
  a.router-link-exact-active {
    color: theme('colors.white');
  }
}
</style>
