import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    token: '',
    cart: JSON.parse(localStorage.getItem('cart')) || []
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
    },
    cartremove (state, index) {
      if (state.cart[index].cartCount > 1) {
        state.cart[index].cartCount -= 1
      }
    },
    cartadd (state, index) {
      state.cart[index].cartCount += 1
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
    },
    total: state => {
      let num = 0
      state.cart.forEach(v => {
        num += v.cartCount * v.price
      })
      return num
    }
  }
})

store.subscribe((mutations, state) => {
  console.log(mutations, state)
  localStorage.setItem('cart', JSON.stringify(state.cart))
})

export default store
