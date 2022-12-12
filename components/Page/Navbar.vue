<script>
import { mapGetters, mapState } from 'vuex'
import p from '~/package.json'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/tailwind.config'
import {debounce} from "~/helpers";

const fullConfig = resolveConfig(tailwindConfig)

export default {
  computed: {
    ...mapState('home', {
      banner: (state) => state.banner,
    }),
    pName() {
      return p.name
    },
    actionSheetHeader() {
      return this.$auth.loggedIn
        ? `Привет, ${this.$auth.user.name}`
        : this.pName
    },
  },
  watch: {
    searchOverlayOn: function (value) {
      value ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
    }
  },
  data() {
    return {
      searchOverlayOn: false,
      search: '',
      searchResult: [],
      menus: [
        { type: 'link', text: 'Главная', route: { name: 'index' } },
        { type: 'link', text: 'Каталог', route: { name: 'catalog' } },
        { type: 'link', text: 'Таможенный сервис', route: { name: 'service' } },
        { type: 'link', text: 'Новости', route: { name: 'news' } },
        { type: 'link', text: 'Контакты', route: { name: 'contacts' } },
      ],
    }
  },
  methods: {
    getBreakpointValue(value) {
      return parseInt(fullConfig.theme.screens[value].replace('px', ''), 10)
    },
    getCurrentBreakpoint() {
      let biggestBreakpointValue = 0,
        currentBreakpoint
      // console.log(fullConfig.theme.screens)
      for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
        const breakpointValue = this.getBreakpointValue(breakpoint)
        // console.log(breakpointValue)
        if (
          breakpointValue > biggestBreakpointValue &&
          window.innerWidth >= breakpointValue
        ) {
          biggestBreakpointValue = breakpointValue
          currentBreakpoint = breakpoint
        }
      }
      return { breakpoint: currentBreakpoint, value: biggestBreakpointValue }
    },

    async openSearch() {
      const currentBreakpoint = this.getCurrentBreakpoint()
      const mdBreakpointValue = this.getBreakpointValue('md')

      if (currentBreakpoint.value > mdBreakpointValue)
        this.searchOverlayOn = true
      else await this.$router.push({ name: 'search' })
    },

    searchResponse: debounce(async function () {
      const response = await this.$axios.get(`/products?search=${this.search}`)
      const result = response.data.data
      this.searchResult = result
      console.log(result)
    }, 300)
  },
}
</script>

<template>
  <BuilderNavbar>
    <template #banner>
      <div
        v-if="banner"
        class="text-white text-xs text-center py-1 px-4 lg:px-8 bg-primary-500"
      >
        <span class="mr-1">
          {{ banner.text }}
        </span>
        <Anchor
          v-if="banner.btn_text"
          class="underline font-bold"
          :text="banner.btn_text"
          :to="banner.btn_url"
        />
      </div>
    </template>
    <template #menu>
      <div class="relative hidden md:flex items-center ml-auto">
        <nav
          class="text-sm leading-6 font-medium text-gray-600 dark:text-gray-300"
          role="navigation"
        >
          <ul class="flex items-center gap-x-8">
            <li v-for="(item, i) in menus" :key="i">
              <Anchor
                v-if="item.type === 'link'"
                :to="item.route ? item.route : undefined"
                :href="item.href ? item.href : undefined"
                class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize"
              >
                {{ item.text }}
              </Anchor>
              <Button
                v-else-if="
                  item.type === 'button' && !$auth.loggedIn && !item.disable
                "
                :text="item.text"
                size="sm"
                class="font-semibold capitalize"
                :to="item.route ? item.route : undefined"
                :href="item.href ? item.href : undefined"
              />
            </li>
            <li v-if="!$auth.loggedIn">
              <Button
                text="Вход / регистрация"
                size="sm"
                class="font-semibold capitalize"
                :to="{ name: 'auth-login' }"
              />
            </li>
          </ul>
        </nav>
        <div
          class="flex gap-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]"
        >
          <button
            class="flex items-center focus:outline-none"
            aria-label="To Search Page"
            @click="openSearch"
          >
            <span
              class="flex items-center text-gray-600 dark:text-gray-300"
              aria-hidden="true"
            >
              <iconify-icon icon="charm:search" class="text-xl" />
            </span>
          </button>

          <Portal to="app-after">
            <div
              v-if="searchOverlayOn"
              class="fixed inset-0 bg-dark/95 z-50 h-screen w-screen"
              @keydown.esc="searchOverlayOn = false"
            >
              <div class="max-w-8xl w-full mx-auto">
                <div class="py-3 lg:py-10 lg:px-8 mx-4 lg:mx-0">
                  <div class="flex flex-col">
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
                    <div class="mt-8" v-if="searchResult.length">
                      <div class="grid grid-cols-4 gap-y-4 gap-x-4">
                        <LazyCatalogItem v-for="item in searchResult.slice(0,4)" :key="item.id" :product="item" />
                      </div>
                    </div>
                    <div class="mt-2" v-if="searchResult.length > 4">
                      <Anchor
                        :to="{ name: 'search' }"
                        text="Посмотреть все"
                        class="text-white"
                      >
                        <template #suffix>
                          <iconify-icon
                            icon="material-symbols:arrow-forward-rounded"
                          ></iconify-icon>
                        </template>
                      </Anchor>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Portal>

          <button
            v-if="$auth.loggedIn"
            class="flex items-center focus:outline-none"
            aria-label="To Search Page"
            @click="$router.push({ name: 'profile' })"
          >
            <span
              class="flex items-center text-gray-600 dark:text-gray-300"
              aria-hidden="true"
            >
              <iconify-icon icon="charm:person" class="text-xl" />
            </span>
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </template>
    <template #options="{ toggleOptions, showOptions }" class="">
      <Transition
        name="animation-menu-toggle"
      >
        <ActionSheet v-show="showOptions" @onClose="toggleOptions(false)">
          <ActionSheetBody>
            <ActionSheetHeader :text="actionSheetHeader" />
            <nav class="leading-6 font-medium text-gray-600 dark:text-gray-300">
              <ul class="flex flex-col">
                <li
                  v-for="(item, i) in menus"
                  :key="i"
                  class="flex w-full"
                  :class="{
                    'pb-2 mb-2 border-b border-gray-900/10 dark:border-gray-50/20':
                      item.type === 'link',
                  }"
                >
                  <Anchor
                    v-if="item.type === 'link'"
                    :to="item.route ? item.route : undefined"
                    :href="item.href ? item.href : undefined"
                    class="flex-1 hover:no-underline capitalize"
                    >{{ item.text }}
                  </Anchor>
                  <Button
                    v-else-if="item.type === 'button'"
                    :text="item.text"
                    class="flex-1 capitalize"
                    :to="item.route ? item.route : undefined"
                    :href="item.href ? item.href : undefined"
                  />
                </li>
                <li>
                  <Button
                    v-if="$auth.loggedIn"
                    text="Мой профиль"
                    class="font-semibold normal-case"
                    :to="{ name: 'profile' }"
                  />
                  <Button
                    v-else
                    text="Вход / регистрация"
                    class="font-semibold capitalize"
                    :to="{ name: 'auth-login' }"
                  />
                </li>
              </ul>
            </nav>
            <!--          <div class="mt-6 text-sm font-medium capitalize">-->
            <!--            Сменить тему-->
            <!--          </div>-->
            <div class="mt-2">
              <ThemeSwitcher type="select-box" />
            </div>
          </ActionSheetBody>
          <Button
            text="Закрыть"
            size="md"
            type="secondary"
            @click="toggleOptions(false)"
          />
        </ActionSheet>
      </Transition>
    </template>
  </BuilderNavbar>
</template>

<style lang="scss">
.animation-menu-toggle-enter-active,
.animation-menu-toggle-leave-active {
  @apply transform transition-transform ease-linear duration-150;
}

.animation-menu-toggle-enter,
.animation-menu-toggle-leave-to {
  @apply translate-y-full;
}

.animation-menu-toggle-enter-to,
.animation-menu-toggle-leave {
  @apply translate-y-0;
}
</style>
