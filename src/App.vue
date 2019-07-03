<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {getStore} from './utils'
export default {
  name: 'App',
  /**
   * 在进入当前路由的时候判断
   * 此方法对要操作的指定页面只执行一次
   * 执行时此页面还没有进行创建 所以获取不到Vm
   */
  beforeRouteEnter (to, from, next) {
    console.log('路由beforeRouteEnter')
  },
  /***
   * 在路由中拦截 微信网页授权
   * 只有用户需登录时去获取 openid 换取前端存的token
   */
  beforeRouteUpdate (to, from, next) {
    console.log('路由beforeRouteUpdate')
    if (to.meta.requireAuth) {
      if (getStore('token')) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    } else {
      next()
    }
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

html,
body,
#app,
.wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

body {
  font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
}

a {
    text-decoration: none
}
</style>
