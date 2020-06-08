/***
 *  封装axios 到vue中的全局变量
 *  1. 设置请求超时时间
 *  2. 设置请求地址前缀地址
 *  3. 设置拦截器 加入token
 */

import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'
import store from '../store/store' // vuex
import { Loading } from 'element-ui';

let loading// 全局加载的时候有一个loading效果
// 状态码错误信息
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请稍后重试。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

axios.defaults.timeout = 10000
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api/'  // 配置了代理跨域 项目根目录中，config/index.js  proxyTable
  // axios.defaults.baseURL = 'https://ddxm661.com/index'  // 配置了代理跨域 项目根目录中，config/index.js  proxyTable
} else {
  axios.defaults.baseURL = 'https://www.ddxm661.com/index' // 正式服务器环境
  // axios.defaults.baseURL = 'https://ddxm661.com/index' // 测试服务器环境
}

// http request 拦截器
axios.interceptors.request.use(
  config => {
    loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    const token = store.state.token  // 从vuex中取出 token，所有接口都带上token
    if (config.data && config.data.form) {
      config.headers = {
        'Content-Type': 'multipart/form-data'
      }
      delete config.data.form
      config.data = config.data['form-data']
    } else {
      config.headers = {
        'Content-Type': 'application/json'
      }
    }
    if (token) {
      config.headers['XX-Token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http reponse 拦截器
axios.interceptors.response.use(
  response => {
    loading.close();
    Vue.prototype.$message.closeAll()
    if (response.data.code === '-2' || response.data.code === -2 || response.data.code === '-1' || response.data.code === -1) {
      store.commit('setUserInfo')
      store.commit('setToken')
      router.push('/login')
    }
    if (response.data.code !== '200' && response.data.code !== 200 && response.data.code !== '1' && response.data.code !== 1) {
      Vue.prototype.$message({
        message: response.data.msg,
        type: 'error'
      })
    }
    return response
  },
  error => {
    loading.close();
    const status = error.response.status
    const errortext = codeMessage[status] || error.response.msg
    // 提示错误信息
    Vue.prototype.$message({
      message: errortext,
      type: 'error'
    })
    // 部分错误状态处理
    if (status === 401) {
      store.commit('setUserInfo')
      store.commit('setToken')
      router.push('/login')
    } else if (status === 403) {
      store.commit('setUserInfo')
      store.commit('setToken')
      router.push('/login')
    } else if (status >= 404 && status < 422) {
      router.push('/404')
    }
    return Promise.reject(error)
  }
)

/***
 * 封装get 方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/***
 * 封装post 请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/***
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}
