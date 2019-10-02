import store from '@/main/store'
import service from './service/home.service'
// import { handleMessages } from '@/modules/Utils/helpers'

const state = {
  wordSynonyms: {},
  loader: false,
}

const getters = {
  wordSynonymsData() {
    return state.wordSynonyms
  },

  loader() {
    return state.loader
  },
}

const actions = {
  async get({ commit }, search) {
    try {
      commit('setLoader', true)
      const result = await service.get(search)
      commit('setData', result)
    } catch (error) {
      commit('setLoader', false)
    }
  },
}

const mutations = {
  setData(state, wordSynonyms) {
    state.wordSynonyms = wordSynonyms
    state.loader = false
  },

  setLoader(state, loader) {
    state.loader = loader
  },
}

store.registerModule('wordSynonyms', {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
})
