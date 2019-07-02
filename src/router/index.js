import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: { title: '登录页' },
      component: resolve => require(['@/components/Login'], resolve)
    },
    {
      path: '/money',
      name: 'GetMoney',
      meta: { title: '前台收银' },
      component: resolve => require(['@/components/pages/Money'], resolve)
    },
    {
      path: '/home',
      name: 'Home',
      component: resolve => require(['@/components/common/Home.vue'], resolve),
      meta: { title: '首页' },
      children: [
        {
          path: '/index',
          component: resolve => require(['@/components/pages/Index.vue'], resolve),
          meta: { title: '前台收银' }
        }
        // {
        //   path: '/index',
        //   component: resolve => require(['@/components/page/Dashboard.vue'], resolve),
        //   meta: { title: '店铺状况' }
        // },
        // {
        //   path: '/index',
        //   component: resolve => require(['@/components/page/Dashboard.vue'], resolve),
        //   meta: { title: '订单管理' }
        // },
        // {
        //   path: '/index',
        //   component: resolve => require(['@/components/page/Dashboard.vue'], resolve),
        //   meta: { title: '会员管理' }
        // },
        // {
        //   path: '/index',
        //   component: resolve => require(['@/components/page/Dashboard.vue'], resolve),
        //   meta: { title: '库存管理' }
        // },
        // {
        //   path: '/index',
        //   component: resolve => require(['@/components/page/Dashboard.vue'], resolve),
        //   meta: { title: '报表分析' }
        // },
        // {
        //   path: '/index',
        //   component: resolve => require(['@/components/page/Dashboard.vue'], resolve),
        //   meta: { title: '营销管理' }
        // },
        // {
        //   path: '/index',
        //   component: resolve => require(['@/components/page/Dashboard.vue'], resolve),
        //   meta: { title: '系统设置' }
        // }
      ]
    }
  ]
})
