export const state = () => ({
  banner: {},
  slides: [],
})

export const getters = {

}

export const mutations = {
  setData(state, data) {
    state.banner = data.banner
    state.slides = data.slides
  },
  setBanner(state, banner) {
    state.banner = banner
  },
  setSlides(state, slides) {
    state.slides = slides
  },
}

export const actions = {
  async fetchData({ commit }) {
    const response = await this.$axios.get(`/home`)
    const result = await response.data.data

    await commit('setData', result)
  },
}
