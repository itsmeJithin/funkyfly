import Api from '@/services/Api'

export default {
  getAllUsers (params) {
    return Api().post('users/get-all-users', params)
  }
}
