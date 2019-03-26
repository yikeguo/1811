class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    this.$fragment = this.nodeToFragment(this.$el)
    this.compileElement(this.$fragment)
    this.$el.appendChild(this.$fragment)
  }
  nodeToFragment(el) {
    let fragment = document.createDocumentFragment()
    let child
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  }
  compileElement(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      let text = node.textContent
      let reg = /\{\{(.*)\}\}/
      if(this.isElementNode(node)){
        this.compile(node)
      }else if(this.isTextNode(node) && reg.test(text)) {

      }
      console.log(text)
    })
  }
  compile(node) {
    
  }
  isElementNode(node) {
    return node.nodeType == 1
  }
  isTextNode(node) {
    return node.nodeType = 3
  }
}