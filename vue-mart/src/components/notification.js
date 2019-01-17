/* eslint-disable */
import Notice from './Notice.vue'
import Vue from 'vue'
//
Notice.newInstance = props => {
  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Alert, {
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
export default Alert

