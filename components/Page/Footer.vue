<script>
import p from '~/package.json'
export default {
  computed: {
    name() {
      return p.name
    },
    author() {
      return p.author
    },
    version() {
      return p.version
    }
  },
  data() {
    return {
      navMenu: [
        {type: 'link', text: 'Главная', route: {name: 'index'}},
        {type: 'link', text: 'Каталог', route: {name: 'catalog'}},
        {type: 'link', text: 'Таможенный сервис', route: {name: 'service'}},
        // {type: 'link', text: 'Новости', route: {name: 'news'}},
        // {type: 'link', text: 'Контакты', route: {name: 'contacts'}},
      ],
      userMenu: [
        {type: 'link', text: 'Профиль', route: {name: 'profile'}},
        // {type: 'link', text: 'Корзина', route: {name: 'basket'}},
        // {type: 'link', text: 'Избранное', route: {name: 'profile-favorite'}},
        {type: 'link', text: 'Реквизиты', route: {name: 'requisites'}},
      ],
      calls: [
        {type: 'link', href: 'tel:+79145692181', text: '8-914-569-21-81'},
      ],
      socials: [
        {icon: 'telegram-fill', href: 'https://t.me/chinavedru'}
      ]
      // socials: [
      //   {icon: 'telegram-fill', href: 'https://t.me/nilparts'}
      // ]
    }
  }
}
</script>

<template>
  <footer class="bg-neutral-50">
    <section class="max-w-8xl mx-auto px-4 lg:px-8 flex flex-col w-full">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-y-6 lg:gap-x-10 py-6 lg:pt-10">
        <div class="flex flex-col">
          <div class="pb-2 border-b">
            <span class="font-medium">Навигация</span>
          </div>
          <ul class="flex flex-col gap-y-2 lg:gap-x-6 pt-4">
            <li v-for="(item, index) in navMenu" :key="index">
              <NuxtLink :to="item.route" class="hover:no-underline text-gray-500 hover:text-slate-900 hover:dark:text-white capitalize transition-colors duration-300 dark:hover:text-white hover:text-gray-900 hover:underline">
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="flex flex-col col-span-2">
          <div class="pb-2 border-b">
            <span class="font-medium">Покупателям</span>
          </div>
          <ul class="flex flex-col gap-y-2 lg:gap-x-6 pt-4">
            <li v-for="(item, index) in userMenu" :key="index">
              <NuxtLink :to="item.route" class="hover:no-underline text-gray-500 hover:text-slate-900 hover:dark:text-white capitalize transition-colors duration-300 dark:hover:text-white hover:text-gray-900 hover:underline">
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="flex flex-col">
          <div class="pb-2 border-b">
            <span class="font-medium">Оставайтесь на связи</span>
          </div>
          <div class="pt-4 flex flex-col gap-y-3.5">
            <div>
              <a v-for="call in calls" :href="call.href" class="font-medium">{{ call.text }} (с 09:00 до 19:00)<br></a>
            </div>
            <div v-if="socials" class="flex gap-x-2">
              <a v-for="social in socials" :href="social.href" class="w-[38px] h-[38px] bg-neutral-200 hover:bg-neutral-300 transition-colors rounded flex items-center justify-center">
                <iconify-icon :icon="`akar-icons:${social.icon}`" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col gap-y-2 md:gap-y-0 md:flex-row justify-between items-start md:items-center py-4 border-t">
        <div class="text-sm text-gray-500">
          © 2022 <a>{{ name }}</a>. Администрация Сайта не несет ответственности за размещаемые Пользователями материалы (в т.ч. информацию и изображения), их содержание и качество.
        </div>
      </div>
    </section>
  </footer>
</template>

<style scoped>

</style>
