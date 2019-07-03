import Vue from 'vue'
import Router from 'vue-router'
import {getStore} from '../utils'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: {
        title: '登录页',
        // 不需要登录
        requireAuth: false,
        // 不需缓存
        keepAlive: false
      },
      component: resolve => require(['@/components/Login'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录页',
        requireAuth: false// 不需要登录
      },
      component: resolve => require(['@/components/Login'], resolve)
    },
    {
      path: '/money',
      name: 'GetMoney',
      meta: {
        title: '前台收银',
        requireAuth: true// 需要登录
      },
      component: resolve => require(['@/components/pages/Money'], resolve)
    },
    {
      path: '/home',
      name: 'Home',
      meta: {
        title: '首页',
        requireAuth: true// 需要登录
      },
      component: resolve => require(['@/components/common/Home.vue'], resolve),
      children: [
        {
          path: '/',
          name: 'Home1',
          meta: {
            title: '首页',
            requireAuth: true// 需要登录
          },
          component: resolve => require(['@/components/pages/Index.vue'], resolve)
        }
      ]
    },
    // 找不到页面跳转到登录页面
    {
      path: '*',
      redirect: '/login'
    }
  ],
  // 定义页面跳转滚动
  scrollBehavior (to, from, savedPosition) {
    console.log(' 定义页面跳转滚动')
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

// router.beforeEach((to, from, next) => {
//   console.log('全局路由守卫beforeEach')
//   if (to.meta.requireAuth) {
//     if (getStore('token')) {
//       next()
//     } else {
//       // next({
//       //   path: '/login'
//       // })
//     }
//   } else {
//     if (getStore('token')) {
//       next({
//         path: '/money'
//       })
//     } else {
//       // next({
//       //   path: '/login'
//       // })
//     }
//   }
// })

export default router
