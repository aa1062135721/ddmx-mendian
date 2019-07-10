// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import * as filters from './filter/index'

// 导入 http请求 定义全局变量·
import {fetch, post, patch, put} from './api/http'
Vue.prototype.$fetch = fetch
Vue.prototype.$post = post
Vue.prototype.$patch = patch
Vue.prototype.$put = put

Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/images/mendian-admin-error.png',
  loading: 'static/images/mendian-admin-loading.png',
  attempt: 1
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
