// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8081',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer "+token
  Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
  Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization'
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
