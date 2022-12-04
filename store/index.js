export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('home/fetchData')
    // await dispatch('advert/fetchAdvert')
    await dispatch('category/fetchCategories')
  },
}
