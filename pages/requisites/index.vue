<script>

export default {
  layout: 'page',
  data() {
    return {
      document: null
    }
  },
  async fetch() {
    this.document = await this.$content("requisites").fetch();
  }
}
</script>

<template>
  <PageWrapper>
    <PageBody>
      <PageHeader>
        <PageTitle text="Реквизиты" />
      </PageHeader>
      <PageSection>
        <NuxtContent :document="document" />
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<style scoped>

</style>
