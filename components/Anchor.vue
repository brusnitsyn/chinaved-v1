<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    to: {
      type: [String, Object],
      default: undefined
    },
    href: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      defaultStyle: 'cursor-pointer transition-colors duration-300 dark:hover:text-white hover:text-primary-600'
    }
  },
  methods: {
    onClick() {
      if (this.to) {
        this.$router.push(this.to)
      }
      if (!this.href) {
        this.$emit('click')
      }
    }
  }
}
</script>

<template>
  <div :class="`inline-flex group ${defaultStyle}`">
    <NuxtLink
      v-if="to"
      tag="a"
      :to="to"
    >
      <slot>{{ text }}</slot>
    </NuxtLink>
    <a
      v-else
      :href="href"
      @click="onClick"
    >
      <slot>{{ text }}</slot>
    </a>
    <div
      v-if="$scopedSlots.suffix"
      class="ml-2 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300"
    >
      <slot name="suffix" />
    </div>
  </div>
</template>
