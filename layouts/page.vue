<script>
export default {
  middleware: 'hideOverlay',
  // watch: {
  //   async $route() {
  //     await this.$store.dispatch('app/setNavbarShowDrawer', false)
  //     await this.$store.dispatch('app/setNavbarShowOptions', false)
  //     document.body.classList.remove('overflow-hidden')
  //   }
  // },
}
</script>

<template>
  <div>
    <PortalTarget name="app-before"/>
    <div id="app-before"></div>
    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <PageNavbar/>
      </slot>
      <div class="flex-1 w-full flex flex-col">
        <div
          class="flex-1 flex flex-col mx-auto max-w-8xl w-full h-full"
        >
          <Nuxt />
        </div>
      </div>
      <slot name="footer">
        <PageFooter/>
      </slot>
    </div>
    <PortalTarget name="app-after" multiple  />
    <div id="app-after"></div>
  </div>
</template>

<style lang="scss">
.slide-fade-from-up-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-from-up-leave-active {
  transition: all 0.28s;
}

.slide-fade-from-up-enter-from,
.slide-fade-from-up-leave-to {
  transform: translateY(100%);
}
</style>
