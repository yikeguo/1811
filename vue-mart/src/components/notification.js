/* eslint-disable */
import Notice from './Notice.vue'
import Vue from 'vue'
//
Notice.newInstance = props => {
  const Instance = new Vue({
    data() {
      return props || {}
    },
    render(h) {
      return h(Notice, {
        props
      })
    }
  })
  const comp = Instance.$mount()
  document.body.appendChild(comp.$el)

  const notice = Instance.$children[0]

  return {
    add(options) {
      notice.add(options)
    },
    del(id) {
      notice.remove(id)
    }
  }
}
export default Notice

