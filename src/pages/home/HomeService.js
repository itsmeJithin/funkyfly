import Api from '@/services/Api'

export default {
  getUserById () {
    return Api().post('users/get-logged-in-user')
  },
  getRecipient (userId) {
    return Api().get('users/get-user?userId=' + userId)
  },
  getAllConversation (sender, receiver) {
    return Api().post('/users/messages/get-all-message', {sender: sender, receiver: receiver})
  },
  sendMessage (messageObject) {
    return Api().post('/users/messages/save-message', messageObject)
  }
}
