<script>
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import {mapGetters, mapState} from "vuex";

export default {
  components: {
    Swiper, SwiperSlide
  },
  computed: {
    ...mapState('home', {
      slides: state => state.slides,
    })
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  }
}
</script>

<template>
  <Swiper :options="swiperOption" class="aspect-[830/390] md:aspect-auto rounded-b-lg">
    <SwiperSlide v-for="(slide) in slides" :key="slide.id">
      <NuxtImg :src="`${slide.image}`" alt="" class="max-h-[668px] object-cover w-full h-full"/>
    </SwiperSlide>
    <div class="swiper-pagination" slot="pagination"></div>
  </Swiper>
</template>

<style scoped>

</style>
