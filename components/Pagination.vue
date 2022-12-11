<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 9
    },
    pageRange: {
      type: Number,
      default: 2
    },
  },
  data() {
    return {
      input: '',
    }
  },
  methods: {
    hasFirst: function () {
      return this.rangeStart !== 1
    },
    hasLast: function () {
      return this.rangeEnd < this.totalPages
    },
    hasPrev: function () {
      return this.current > 1
    },
    hasNext: function () {
      return this.current < this.totalPages
    },
    changePage: function (page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('page-changed', page)
      }
    }
  },
  computed: {
    pages: function () {
      let pages = []
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }
      return pages
    },
    rangeStart: function () {
      let start = this.current - this.pageRange
      return (start > 0) ? start : 1
    },
    rangeEnd: function () {
      let end = this.current + this.pageRange
      return (end < this.totalPages) ? end : this.totalPages
    },
    totalPages: function () {
      return Math.ceil(this.total / this.perPage)
    },
    nextPage: function () {
      let currentPage = this.current
      return currentPage + 1
    },
    prevPage: function () {
      let currentPage = this.current
      return currentPage - 1
    }
  }
}
</script>

<template>
  <div class="min-w-max">
    <section class="flex justify-center bg-white rounded-lg border border-gray-900/10 dark:border-gray-50/20 px-2 lg:px-10 py-3 text-gray-700">
      <ul class="flex items-center gap-x-2 lg:gap-x-6 select-none">
        <li v-if="hasPrev()">
          <a @click.prevent="changePage(prevPage)">
            <div class="flex items-center justify-center hover:bg-gray-200 rounded-md h-6 w-6 lg:h-8 lg:w-8 cursor-pointer">
              <div>
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </div>
            </div>
          </a>
        </li>
        <li v-if="hasFirst()">
          <a @click.prevent="changePage(1)">
            <div class="flex hover:bg-gray-200 rounded-md h-6 w-6 lg:h-8 lg:w-8 cursor-pointer items-center justify-center">
              <span>
                1
              </span>
            </div>
          </a>
        </li>
        <li class="pr-4 lg:pr-6 cursor-default" v-if="hasFirst()">...</li>
        <li v-for="page in pages">
          <a @click.prevent="changePage(page)">
            <div :class="{'bg-primary-500 text-white cursor-default': current === page, 'lg:hover:bg-gray-200 cursor-pointer': current !== page}"
                 class="flex rounded-md h-6 w-6 lg:h-8 lg:w-8 items-center justify-center">
              <span>{{ page }}</span>
            </div>
          </a>
        </li>
        <li class="pr-4 lg:pr-6 cursor-default" v-if="hasLast()">...</li>
        <li v-if="hasLast()">
          <a @click.prevent="changePage(totalPages)">
            <div class="flex hover:bg-gray-200 rounded-md h-6 w-6 lg:h-8 lg:w-8  items-center justify-center cursor-pointer lg:hover:bg-gray-200">
              <span>
                {{ totalPages }}
              </span>
            </div>
          </a>
        </li>
        <li v-if="hasNext()">
          <a @click="changePage(nextPage)">
            <div class="flex items-center justify-center hover:bg-primary-500 rounded-md h-6 w-6 lg:h-8 lg:w-8 cursor-pointer lg:hover:bg-gray-200">
              <div>
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </a>
        </li>
      </ul>

<!--      <div class="flex items-center hidden lg:block">-->
<!--        <div class="pr-2 text-gray-400 font-medium">-->
<!--          <span id="text-before-input">-->
<!--            {{ textBeforeInput }}-->
<!--          </span>-->
<!--        </div>-->
<!--        <div class="w-14 rounded-md border border-indigo-400 px-1 py-1">-->
<!--          <input v-model.number="input" class="w-12 focus:outline-none px-2" type="text">-->
<!--        </div>-->
<!--        <div @click.prevent="changePage(input)" class="flex items-center pl-4 font-medium cursor-pointer">-->
<!--          <span id="text-after-input">-->
<!--            {{ textAfterInput }}-->
<!--          </span>-->
<!--          <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>-->
<!--          </svg>-->
<!--        </div>-->
<!--      </div>-->
    </section>
  </div>
</template>
