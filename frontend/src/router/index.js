import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'
import store from '../store/index'

Vue.use(Router)

const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

const demoRoutes = []
console.log('URL IS', process.env.VUE_APP_BACKEND_URL)
export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'login' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../components/auth/login/Login.vue'),
        },
        {
          path: '',
          redirect: { name: 'login' },
        },
      ],
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      beforeEnter: function (to, from, next) {
        if (store.state.isAuthenticated) {
          next()
        } else {
          next({ name: 'login' })
          alert("you don't have permissions for this comoponent")
        }
      },
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          name: 'profileselect',
          path: 'profileselect',
          component: () => import('../components/profileselect/ProfileSelect.vue'),
          default: true,
          beforeEnter: function (to, from, next) {
            if (store.state.isAuthenticated) {
              next()
            } else {
              next({ name: 'login' })
              alert("you don't have permissions for this comoponent")
            }
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../components/dashboard/Dashboard.vue'),
          default: true,
          beforeEnter: function (to, from, next) {
            if (store.state.isAuthenticated) {
              next()
            } else {
              next({ name: 'login' })
              alert("you don't have permissions for this comoponent")
            }
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'charts',
          path: 'charts',
          component: () => import('../components/statistics/charts/Charts.vue'),
          default: true,
          beforeEnter: function (to, from, next) {
            if (store.state.isAuthenticated) {
              next()
            } else {
              next({ name: 'login' })
              alert("you don't have permissions for this comoponent")
            }
          },
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'liveData',
          path: 'live',
          component: () => import('../components/live/LiveData.vue'),
          default: true,
          beforeEnter: function (to, from, next) {
            if (store.state.isAuthenticated) {
              next()
            } else {
              next({ name: 'login' })
              alert("you don't have permissions for this comoponent")
            }
          },
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
})

// Router.beforeEach((to, from, next) => {
//   if (localStorage.getItem('ars') === null && to.meta.requiresAuth) {
//     next({ path: '/auth/login', params: { nextUrl: to.fullPath } })
//   } else {
//     next({ name: 'login' })
//   }
// })
