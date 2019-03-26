var data = {neme: 'node'}
observe(data)
data.name = 'wkb'

function observe(data) {
  if(!data || typeof data!== 'object') {
    return
  }
  Object.keys(data).forEach(function(key){
    defineReactive(data, key, data[key])
  })
}

function defineReactive(data, key, val) {
  observe(val)
}