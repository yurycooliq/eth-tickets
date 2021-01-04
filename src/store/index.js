import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    owner: false,
    address: null
  },
  mutations: {
    setOwner: (state, isOwner) => {
      state.owner = isOwner
    },
    setAddress: (state, address) => {
      state.address = address
    }
  },
  actions: {
    setAddress: ({ state, commit }) => {

    }
  },
  modules: {
  }
})
