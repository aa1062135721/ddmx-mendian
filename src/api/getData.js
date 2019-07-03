import Vue from 'vue'

/**
 * 登录接口
 * @returns {Promise|*}
 */
export const postLogin = (data) => {
  return Vue.prototype.$post('login/doLogin', data)
}
