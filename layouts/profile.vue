<script>
export default {
  middleware: 'hideOverlay',
}
</script>

<template>
  <div>
    <PortalTarget name="app-before"/>
    <div id="app-before"></div>
    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <ProfileNavbar />
      </slot>
      <div class="flex-1 w-full flex flex-col">
        <div
          class="flex-1 flex mx-auto max-w-8xl w-full h-full"
        >
          <Nuxt />
        </div>
      </div>
      <slot name="footer">
        <PageFooter />
      </slot>
    </div>
    <PortalTarget name="app-after"/>
    <div id="app-after"></div>
  </div>
</template>
