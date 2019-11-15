import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import Home from '@/pages/home/Home'
import store from '../store.js'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home/:uid?/:socketId?',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (store.getters.isLoggedIn) {
      next('/home')
      return
    }
    next()
  }
})
export default router
