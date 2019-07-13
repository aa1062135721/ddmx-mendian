import Vue from 'vue'

/**
 * 登录接口
 * @returns {Promise|*}
 */
export const postLogin = (data = null) => {
  return Vue.prototype.$post('/login/doLogin', data)
}

/**
 * 登录接口
 * @returns {Promise|*}
 */
export const postUserInfo = (data = null) => {
  return Vue.prototype.$post('/user/userInfo', data)
}

/**
 * 收银大屏-分类列表
 * @param data
 * @returns {*}
 */
export const postTwotype = (data = null) => {
  return Vue.prototype.$post('/index/getTwotype', data)
}

/**
 * 收银大屏-获取商品
 * @param data
 * @returns {*}
 */
export const postGoods = (data = null) => {
  return Vue.prototype.$post('/index/itemList', data)
}

/**
 * 收银大屏-获取商品（根据商品条形码）
 * @param data
 * @returns {*}
 */
export const postGoodsByCode = (data = null) => {
  return Vue.prototype.$post('/index/search_code_item', data)
}

/**
 * 收银大屏-服务商品
 * @param data
 * @returns {*}
 */
export const postServiceItemList = (data = null) => {
  return Vue.prototype.$post('/index/serviceItemList', data)
}

/**
 * 收银大屏-服务人员列表
 * @param data
 * @returns {*}
 */
export const postWaiter = (data = null) => {
  return Vue.prototype.$post('/index/waiter', data)
}

/**
 * 收银大屏-根据手机号码搜索会员
 * @param data
 * @returns {*}
 */
export const postSearchVip = (data = null) => {
  return Vue.prototype.$post('/index/findMember', data)
}

/**
 * 收银大屏-会员充值
 * @param data
 * @returns {*}
 */
export const postMemberVipRecharge = (data = null) => {
  return Vue.prototype.$post('/Recharge/index', data)
}

/**
 * 收银大屏-会员充值记录
 * @param data
 * @returns {*}
 */
export const postMemberVipRechargeLog = (data = null) => {
  return Vue.prototype.$post('/Recharge/rechargeLog', data)
}

/**
 * 收银大屏-新增会员
 * @param data
 * @returns {*}
 */
export const postAddMemberVip = (data = null) => {
  return Vue.prototype.$post('/index/addVip', data)
}

/**
 * 收银大屏-获取会员的服务卡列表
 * @param data
 * @returns {*}
 */
export const postMemberServiceCards = (data = null) => {
  return Vue.prototype.$post('/ticket/ticket_buy_list', data)
}

/**
 * 收银大屏-会员的服务卡-激活
 * @param data
 * @returns {*}
 */
export const postMemberServiceCardsActive = (data = null) => {
  return Vue.prototype.$post('/ticket/active', data)
}

/**
 * 收银大屏-会员的服务卡-耗卡列表
 * @param data
 * @returns {*}
 */
export const postMemberServiceCardsUseList = (data = null) => {
  return Vue.prototype.$post('/ticket/ticket_consume_list', data)
}

/**
 * 收银大屏-会员的服务卡-耗卡列表-耗卡
 * @param data
 * @returns {*}
 */
export const postMemberServiceCardsUseListTicket = (data = null) => {
  return Vue.prototype.$post('/ticket/ticket_consume', data)
}

/**
 * 收银大屏-会员的服务卡-使用记录
 * @param data
 * @returns {*}
 */
export const postMemberServiceCardsUseRecords = (data = null) => {
  return Vue.prototype.$post('/ticket/ticket_records', data)
}

/**
 * 收银大屏-购买服务卡-服务卡列表
 * @param data
 * @returns {*}
 */
export const postBuyServiceCards = (data = null) => {
  return Vue.prototype.$post('/ticket/ticket_list', data)
}

/**
 * 收银大屏-商品，服务商品-结算
 * @param data
 * @returns {*}
 */
export const postNowPayGoods = (data = null) => {
  return Vue.prototype.$post('/Settlement/index', data)
}

/**
 * 收银大屏-购买服务卡-立即支付
 * @param data
 * @returns {*}
 */
export const postNowPayServiceCards = (data = null) => {
  return Vue.prototype.$post('/ticket/buy', data)
}
