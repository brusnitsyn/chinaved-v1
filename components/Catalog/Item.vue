<script>
import {mapActions} from "vuex";

export default {
  props: {
    product: {
      type: Object,
      default: undefined,
    },
    isLoaded: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // ...mapActions({
    //   addBasket: 'products/basket/addProduct'
    // }),
    async addBasket(product) {
      const obj = {product_id: product.id, quantity: 1}
      await this.$store.dispatch('products/basket/addProduct', obj)
    },
  },
}
</script>

<template>
  <div
    class="flex flex-col justify-between rounded-lg border bg-white border-gray-900/10 dark:border-gray-50/20 shadow-sm p-3 w-full"
  >
    <NuxtLink
      class="flex flex-col"
      :to="{ name: 'products-slug', params: { slug: product.slug } }"
    >
      <Skeleton
        :is-loaded="!isLoaded"
        :w="null"
        :h="null"
        skeleton-class="rounded-lg h-[196px] w-full md:w-[294px] object-cover"
      >
        <NuxtImg
          loading="lazy"
          :src="`${product.cover}`"
          class="rounded-lg h-[196px] w-full lg:w-[294px] object-cover"
        />
      </Skeleton>
      <div class="pt-1.5 pb-2">
        <Skeleton :is-loaded="!isLoaded" :w="null" :m="null" skeleton-class="text-lg mt-1 mb-2 w-1/3">
          <span class="text-lg leading-6 line-clamp-2">
            {{ product.title }}
          </span>
        </Skeleton>
      </div>
      <div class="items-end">
        <Skeleton :is-loaded="!isLoaded" h="28px" :m="null" skeleton-class="mb-2">
          <div class="flex justify-between items-center pb-2">
          <span v-if="product.price" class="font-medium text-xl">{{
              product.price | toRuble
            }}</span>
            <div
              v-if="product.in_stock"
              class="flex flex-row items-center gap-x-1 text-white bg-green-600 px-2 py-1 rounded-lg text-sm"
            >
              <iconify-icon
                icon="material-symbols:check-circle-outline-rounded"
                class="text-lg"
              />
              <span>В наличии</span>
            </div>
            <div
              v-else
              class="flex flex-row items-center gap-x-1 text-white bg-red-600 px-2 py-1 rounded-lg text-sm"
            >
              <iconify-icon
                icon="material-symbols:error-circle-rounded-outline"
                class="text-lg"
              />
              <span>Нет в наличии</span>
            </div>
          </div>
        </Skeleton>
      </div>
    </NuxtLink>
    <hr class="border-gray-900/10 dark:border-gray-50/20" />
    <div class="pt-3 align-bottom">
      <Skeleton :is-loaded="!isLoaded" h="40px" skeleton-class="">
        <div class="flex flex-row justify-between gap-x-4">
          <div class="flex-1">
            <Button v-if="product.in_stock" @click="addBasket(product)" text="Купить" />
            <Button v-else text="Нет в наличии" disabled />
          </div>
<!--          <button class="w-[40px] flex justify-center items-center">-->
<!--&lt;!&ndash;            <iconify-icon icon="material-symbols:favorite-outline-rounded" width="22" />&ndash;&gt;-->
<!--            <iconify-icon icon="material-symbols:favorite-rounded" width="26" class="text-red-500" />-->
<!--          </button>-->
        </div>
      </Skeleton>
    </div>
  </div>
</template>
