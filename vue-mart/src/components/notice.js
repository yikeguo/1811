import Notification from './notification'

let msgInstance

function getInstance() {
  msgInstance = msgInstance || Notification.newInstance()
  return msgInstance
}
function info ({duration=2, content=""}) {
  let ins = getInstance()
  ins.add({
    content,
    duration
  })
}

export default {
  info
}