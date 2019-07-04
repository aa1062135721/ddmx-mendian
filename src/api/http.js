/***
 *  封装axios 到vue中的全局变量
 *  1. 设置请求超时时间
 *  2. 设置请求地址前缀地址
 *  3. 设置拦截器 加入token
 */

import axios from 'axios'
import Vue from 'vue'
import Router from '../router'
import { getStore } from '../utils'

axios.defaults.timeout = 10000
// axios.defaults.baseURL = 'http://ddxmtp5.com/index'  //配置了代理跨域 项目根目录中，config/index.js  proxyTable
axios.defaults.baseURL = '/api/index/'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 引入cookie 存储token 有的接口需要认证
    const token = getStore('token')
    // config.data = config.data
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
    /***
     * 处理需要登录的错误代码
     */
    if (response.data.code === '-2') {
      alert(response.data.msg)
      Router.push({
        path: '/login',
        query: {}
      })
    }
    return response
  },
  error => {
    console.log('Error', error.message)
    // 做全局错误提示消息
    if (error.message === 'Error timeout of 5000ms exceeded') {
      Vue.$vux.toast.text('请求超时，请刷新!', 'middle')
    }
    if (error.message === 'Request failed with status code 500') {
      Vue.$vux.toast.text('系统异常，请稍候重试!', 'middle')
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
