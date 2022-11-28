import { createStore } from 'vuex'
const USER_KEY = 'USER_TOKEN'
export default createStore({
  state: {
    userToken: JSON.parse(window.localStorage.getItem(USER_KEY))
  },
  getters: {
  },
  mutations: {
    setUserToken (state, data) {
      state.userToken = data
      window.localStorage.setItem(USER_KEY, JSON.stringify(state.userToken))
    }
  },
  actions: {
  },
  modules: {
  }
})
