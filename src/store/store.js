import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // vuex持久化存储的插件

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  token: '',
  userInfo: {
    id: 1, // 用户id
    user_type: 1, //
    sex: 1,
    birthday: 1699200,
    last_login_time: 1560496211,
    score: 0,
    coin: 0,
    create_time: 1510561182,
    user_status: 1,
    user_login: 'admin', // 账号
    user_pass: '###7f4613cc5b4b2a6d99069dbeca8335d9',
    user_nickname: '', // 名称
    user_email: '465497241@qq.com', // 邮箱
    user_url: '',
    shop_name: '',
    avatar: '',
    signature: '',
    last_login_ip: '127.0.0.1',
    user_activation_key: '',
    mobile: '',
    more: '',
    shop_id: '18', // 用户的商铺id
    balance: 89000000 // 余额
  }
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setUserInfo (state, saveData = {}) {
    state.userInfo = saveData
  },
  setToken (state, saveData = '') {
    state.token = saveData
  },
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  saveUserInfo ({ commit }, saveData = {}) {
    commit('setUserInfo', saveData)
  },
  saveToken ({ commit }, saveData = '') {
    commit('setToken', saveData)
  },
}

// getters are functions
const getters = {
  userInfo: state => state.userInfo,
  token: state => state.token,
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()] // vuex持久化存储的插件
})
