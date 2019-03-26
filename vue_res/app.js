
class Dep{
  constructor() {
    this.deps = []
  }
  addDep(dep) {
    this.deps.push(dep)
  }
  notify() {
    this.deps.forEach(dep => {
      dep.update()
    })
  }
}
Dep.target = null

class Watcher {
  constructor(){
    Dep.target = this
  }
  update() {
    console.log('update -~~ 收到')
  }
}

class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.observe(this.$data)

    this.proxyData()
    new Watcher()
    console.log('模拟render', this.name)
    this.$compile = new Compile(options.el, this)
  }
  observe(data) {
    Object.keys(data).forEach(key => {
      this.proxyData(key)
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, val) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        console.log('收集依赖')
        dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        val = newVal
        console.log('通知依赖更新')
        dep.notify()
      }
    })
  }
  proxyData(key){
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(val){
        this.$data[key] = val
      }
    })
  }
}