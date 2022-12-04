export const state = () => ({
  heroSlides: [],
  advertBanner: {},
})

export const getters = {
  getHeroSlides(state) {
    return state.heroSlides
  },
  getAdvertBanner(state) {
    return state.advertBanner
  },
}

export const mutations = {
  setData(state, data) {
    state.heroSlides = data.slides
    state.advertBanner = data.banner
  },
  setHeroSlides(state, slides) {
    state.heroSlides = slides
  },
  setAdvertBanner(state, banner) {
    state.advertBanner = banner
  },
}

export const actions = {
  async fetchData({commit, state}) {
    const response = await this.$axios.get('/home')

    const result = await response.data.data
    await commit('setData', result)
  },

  async fetchHeroSlides({commit, state}) {
    const slides = await this.$axios.get('/home')
    const result = await slides.data.data.slides
    await commit('setHeroSlides', result)
  },

  async fetchAdvertBanner({commit, state}) {
    const slides = await this.$axios.get('/home')
    const result = await slides.data.data.banner
    await commit('setHeroSlides', result)
  },
}
