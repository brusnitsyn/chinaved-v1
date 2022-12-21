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
  data() {
    return {
      menus: [
        { type: 'link', text: 'Главная', route: { name: 'index' } },
        { type: 'link', text: 'Каталог', route: { name: 'catalog' } },
        { type: 'link', text: 'Таможенный сервис', route: {name: 'service'} },
        // { type: 'link', text: 'Новости', route: { name: 'news' } },
        // { type: 'link', text: 'Контакты', route: { name: 'contacts' } },
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

      // if (currentBreakpoint.value > mdBreakpointValue)
      this.searchOverlayOn = true
      // else await this.$router.push({ name: 'search' })
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
        v-if="banner && banner.text"
        class="text-white text-xs text-center py-1 px-4 lg:px-8 bg-primary-500"
      >
        <span class="mr-1">
          {{ banner.text }}
        </span>
        <LazyAnchor
          v-if="banner.btn_text"
          class="underline font-bold"
          :text="banner.btn_text"
          :to="banner.btn_url"
        />
      </div>
    </template>
    <template #menu>
      <div class="relative hidden md:flex md:justify-end items-center grow">
        <div class="flex">
          <nav
            class="text-sm leading-6 font-medium text-gray-600 dark:text-gray-300"
            role="navigation"
          >
            <ul class="flex items-center gap-x-8">
              <li v-for="(item, i) in menus" :key="i">
                <LazyAnchor
                  v-if="item.type === 'link'"
                  :to="item.route ? item.route : undefined"
                  :href="item.href ? item.href : undefined"
                  class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize"
                >
                  {{ item.text }}
                </LazyAnchor>
                <LazyButton
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
                <LazyButton
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
      </div>
    </template>
    <template #options="{ toggleOptions, showOptions }" class="">
      <Transition
        name="animation-menu-toggle"
      >
        <ActionSheet v-show="showOptions" @onClose="toggleOptions(false)">
          <LazyActionSheetBody>
            <LazyActionSheetHeader :text="actionSheetHeader" />
            <nav class="leading-6 font-medium text-gray-600 dark:text-gray-300">
              <ul class="flex flex-col">
                <li
                  v-for="(item, i) in menus"
                  :key="i"
                  class="justify-start flex-1 items-start"
                  :class="{
                    'pb-2 mb-2 border-b border-gray-900/10 dark:border-gray-50/20 last:border-none':
                      item.type === 'link',
                  }"
                >
                  <LazyAnchor
                    v-if="item.type === 'link'"
                    :to="item.route ? item.route : undefined"
                    :href="item.href ? item.href : undefined"
                    class="flex-1 hover:no-underline capitalize"
                  >{{ item.text }}
                  </LazyAnchor>
                  <LazyButton
                    v-else-if="item.type === 'button'"
                    :text="item.text"
                    class="flex-1 capitalize"
                    :to="item.route ? item.route : undefined"
                    :href="item.href ? item.href : undefined"
                  />
                </li>
                <li>
                  <LazyButton
                    v-if="$auth.loggedIn"
                    text="Мой профиль"
                    class="font-semibold normal-case"
                    :to="{ name: 'profile' }"
                  />
                  <LazyButton
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
          </LazyActionSheetBody>
          <LazyButton
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
