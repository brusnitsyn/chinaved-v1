<script>
export default {
  layout: 'page',
  middleware: 'auth',
  data() {
    return {
      profileForm: {
        name: '',
        email: '',
        password: '',
        image: {}
      }
    }
  },
  mounted() {
    const user = this.$auth.user
    if(Object.keys(user).length)
      this.profileForm = user
  }
}
</script>

<template>
  <PageWrapper>
    <PageBody>
      <PageHeader>
        <PageTitle text="Редактировать профиль" />
      </PageHeader>
      <PageSection>
        <PageSectionTitle text="Основная информация" />
        <Form class="max-w-xl">
          <template #body>
            <FormTextInput type="name" v-model="profileForm.name" placeholder="Имя" />
            <FormTextInput type="email" v-model="profileForm.email" placeholder="Электронная почта" />
          </template>
          <template #footer>
            <div class="flex">
              <Button>
                Сохранить
              </Button>
            </div>
          </template>
        </Form>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
