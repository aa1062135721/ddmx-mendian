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
    {
      path: '/help',
      name: 'Help',
      meta: {
        title: '帮助中心',
        requireAuth: true// 需要登录
      },
      component: resolve => require(['@/components/pages/Help'], resolve)
    },
    {
      path: '*',
      redirect: '/login'
    }
  ],
  // 定义页面跳转滚动
  scrollBehavior (to, from, savedPosition) {
    // console.log(' 定义页面跳转滚动')
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

router.beforeEach((to, from, next) => {
  // console.log('全局路由守卫beforeEach', to)
  let isLogin = getStore('token')
  if (to.matched.length === 0) {
    // 没有匹配到当前路由
    next('/')
  } else if (!isLogin && to.path !== '/login' && to.path !== '/' && to.path !== '/password') {
    // 如果没有登录，跳转到登录页面
    next('/login')
  } else {
    if ((to.path === '/login' || to.path === '/register' || to.path === '/password' || to.path === '/error') && isLogin) {
      // 如果已经登录，却尝试访问登录页面或者错误页面，将继续保持原本的页面
      next(from.path)
    } else {
      next()
    }
  }
})

export default router
