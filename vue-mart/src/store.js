import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    cart: []
  },
  mutations: {
    settoken (state, token) {
      state.token = token
    },
    addCart (state, item) {
      const good = state.cart.find(v => v.title==item.title)
      if (good) {
        good.cartCount += 1
      } else {
        state.cart.push({
          ...item,
          cartCount: 1
        })
      }
    }
  },
  actions: {

  },
  getters: {
    cartTotal: state => {
      let num = 0
      state.cart.forEach(v => {
        num += v.cartCount
      })
      return num
    }
  }
})
