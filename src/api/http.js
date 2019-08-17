/***
 *  封装axios 到vue中的全局变量
 *  1. 设置请求超时时间
 *  2. 设置请求地址前缀地址
 *  3. 设置拦截器 加入token
 */

import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'
import { getCookie, removeCookie } from '../utils'
import store from '../store/store' // vuex

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
axios.defaults.baseURL = 'http://testmd.ddxm661.com/index' //   // 配置了代理跨域 项目根目录中，config/index.js  proxyTable
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api/index/'  // 配置了代理跨域 项目根目录中，config/index.js  proxyTable
} else {
  axios.defaults.baseURL = 'http://testmd.ddxm661.com/index' //   // 配置了代理跨域 项目根目录中，config/index.js  proxyTable
}
/**
 * 决绝同一个接口，相同参数，相同请求方法 ……  发送多次请求
 * @type {Array}
 */
let pending = [] // 声明一个数组用于存储每个请求的取消函数和axios标识
let cancelToken = axios.CancelToken
let removePending = (config) => {
  for (let p in pending) {
    if ((pending[p].u) === (config.url + JSON.stringify(config.data) + '&' + config.method)) { // 当当前请求在数组中存在时执行函数体
      pending[p].f('操作频繁,请稍后再试 ^_^') // 执行取消操作
      pending.splice(p, 1)
    }
  }
}

// http request 拦截器
axios.interceptors.request.use(
  config => {
    removePending(config) // 在一个axios发送前执行一下取消操作
    // eslint-disable-next-line new-cap
    config.cancelToken = new cancelToken((c) => {
      // 这里的axios标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + JSON.stringify(config.data) + '&' + config.method, f: c })
    })

    const token = getCookie('token')  // 从cookie中取出 token，所有接口都带上token
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
    removePending(response.config) // 在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除

    Vue.prototype.$message.closeAll()
    if (response.data.code === '-2' || response.data.code === -2 || response.data.code === '-1' || response.data.code === -1) {
      removeCookie('token')
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
    const status = error.response.status
    const errortext = codeMessage[status] || error.response.msg
    // 提示错误信息
    Vue.prototype.$message({
      message: errortext,
      type: 'error'
    })
    // 部分错误状态处理
    if (status === 401) {
      removeCookie('token')
      store.commit('setUserInfo')
      store.commit('setToken')
      router.push('/login')
    } else if (status === 403) {
      removeCookie('token')
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
