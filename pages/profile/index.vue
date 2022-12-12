<script>
import {mapGetters} from "vuex";

export default {
  layout: 'profile',
  middleware: 'auth',
  // computed: {
  //   ...mapGetters({
  //     products: 'products/getProducts'
  //   })
  // },
  // async fetch() {
  //   await this.$store.dispatch('products/fetchMyProducts')
  // },
}
</script>

<template>
  <PageWrapper>
    <PageBody>
      <PageSection>
        <ProfileTitle :text="$auth.user.name" />
        <ProfileNavWrapper class="pt-2">
<!--          <ProfileNavItem text="Мои товары" :to="{name: 'profile-products'}">-->
<!--            <template #icon>-->
<!--              <iconify-icon icon="material-symbols:border-all-outline-rounded" width="24" height="24"></iconify-icon>-->
<!--            </template>-->
<!--            <template #option>-->
<!--              <span>-->
<!--                Добавлено: {{ products.length }}-->
<!--              </span>-->
<!--            </template>-->
<!--          </ProfileNavItem>-->
<!--          <ProfileNavItem text="Моя корзина" :to="{name: 'basket'}">-->
<!--            <template #icon>-->
<!--              <iconify-icon icon="material-symbols:shopping-cart-outline-rounded" width="24" height="24"></iconify-icon>-->
<!--            </template>-->
<!--            <template #option>-->
<!--              <span>-->
<!--                Товаров: 4-->
<!--              </span>-->
<!--            </template>-->
<!--          </ProfileNavItem>-->
<!--          <ProfileNavItem text="Мои избранные" :to="{name: 'profile-favorite'}">-->
<!--            <template #icon>-->
<!--              <iconify-icon icon="material-symbols:favorite-outline-rounded" width="24" height="24"></iconify-icon>-->
<!--            </template>-->
<!--            <template #option>-->
<!--              <span>-->
<!--                Товаров: 0-->
<!--              </span>-->
<!--            </template>-->
<!--          </ProfileNavItem>-->
<!--          <ProfileNavItem text="Мои заказы">-->
<!--            <template #icon>-->
<!--              <iconify-icon icon="material-symbols:library-books-outline-rounded" width="24" height="24"></iconify-icon>-->
<!--            </template>-->
<!--            <template #option>-->
<!--              <span>-->
<!--                К оплате: 2-->
<!--              </span>-->
<!--            </template>-->
<!--          </ProfileNavItem>-->
<!--          <ProfileNavItem text="Мой магазин">-->
<!--            <template #icon>-->
<!--              <iconify-icon icon="material-symbols:storefront-outline-rounded" width="24" height="24"></iconify-icon>-->
<!--            </template>-->
<!--            <template #option>-->
<!--              <span>-->
<!--                Организаций: 1-->
<!--              </span>-->
<!--            </template>-->
<!--          </ProfileNavItem>-->
<!--          <ProfileNavItem text="Поддержка">-->
<!--            <template #icon>-->
<!--              <iconify-icon icon="material-symbols:support-agent-rounded" width="24" height="24"></iconify-icon>-->
<!--            </template>-->
<!--            <template #option>-->
<!--              <span>-->
<!--                Тикетов: 0-->
<!--              </span>-->
<!--            </template>-->
<!--          </ProfileNavItem>-->
        </ProfileNavWrapper>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
