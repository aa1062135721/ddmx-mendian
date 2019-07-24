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

/**
 * 帮助中心-获取帮助信息
 * @param data
 * @returns {*}
 */
export const postGetHelpList = (data = null) => {
  return Vue.prototype.$post('/help/index', data)
}

/**
 * 支出管理-营业支出列表
 * @param data
 * @returns {*}
 */
export const postExpenditureList = (data = null) => {
  return Vue.prototype.$post('/Expenditure/expenditure_list', data)
}

/**
 * 支出管理-支出类型管理列表
 * @param data
 * @returns {*}
 */
export const postExpenditureTypeNameList = (data = null) => {
  return Vue.prototype.$post('/Expenditure/typesList', data)
}

/**
 * 支出管理-营业支出的增加
 * @param data
 * @returns {*}
 */
export const postAddExpenditure = (data = null) => {
  return Vue.prototype.$post('/Expenditure/expenditure_add', data)
}

/**
 * 支出管理-营业支出的删除
 * @param data
 * @returns {*}
 */
export const postDelExpenditure = (data = null) => {
  return Vue.prototype.$post('/Expenditure/deleteType', data)
}

/**
 * 订单管理-获取订单列表
 * @param data
 * @returns {*}
 */
export const postOrderList = (data = null) => {
  return Vue.prototype.$post('/order/order_list', data)
}

/**
 * 订单管理-获取服务员信息
 * @param data
 * @returns {*}
 */
export const postOrderWaiter = (data = null) => {
  return Vue.prototype.$post('/order/waiter', data)
}

/**
 * 订单管理-获取会员信息
 * @param data
 * @returns {*}
 */
export const postMemberInfo = (data = null) => {
  return Vue.prototype.$post('/member/member', data)
}

/**
 * 订单管理-获取会员信息
 * @param data
 * @returns {*}
 */
export const postMemberLevelInfo = (data = null) => {
  return Vue.prototype.$post('/index/level_info', data)
}

/**
 * 订单管理-门店订单详情
 * @param data
 * @returns {*}
 */
export const postOrderDetails = (data = null) => {
  return Vue.prototype.$post('/order/order_details', data)
}

/**
 * 订单管理-门店订单详情 - 商品明细
 * @param data
 * @returns {*}
 */
export const postOrderDetailsGoods = (data = null) => {
  return Vue.prototype.$post('/order/order_goods_list', data)
}

/**
 * 订单管理-库存管理 - 盘点单列表
 * @param data
 * @returns {*}
 */
export const postCheckOrderList = (data = null) => {
  return Vue.prototype.$post('/Check/index', data)
}

/**
 * 订单管理-库存管理 - 盘点单 -新增盘点单时 获取商品别表
 * @param data
 * @returns {*}
 */
export const postCheckOrderAddGoodList = (data = null) => {
  return Vue.prototype.$post('/Check/add', data)
}

/**
 * 订单管理-库存管理 - 盘点单 -新增盘点单
 * @param data
 * @returns {*}
 */
export const postCheckOrderAdd = (data = null) => {
  return Vue.prototype.$post('/Check/doPost', data)
}

/**
 * 订单管理-库存管理 - 盘点单 -详情
 * @param data
 * @returns {*}
 */
export const postCheckOrderInfo = (data = null) => {
  return Vue.prototype.$post('/Check/info', data)
}

/**
 * 订单管理-库存管理 - 盘点单 -删除
 * @param data
 * @returns {*}
 */
export const postCheckOrderDel = (data = null) => {
  return Vue.prototype.$post('/Check/del', data)
}

/**
 * 订单管理-库存管理 - 盘点单 -删除
 * @param data
 * @returns {*}
 */
export const postCheckOrderConfirm = (data = null) => {
  return Vue.prototype.$post('/Check/confirm', data)
}

/**
 * 订单管理-库存管理 - 盘点单 -编辑 --只允许 编辑 备注信息，
 其他信息不允许编辑
 * @param data
 * @returns {*}
 */
export const postCheckOrderEdit = (data = null) => {
  return Vue.prototype.$post('/Check/editRemarks', data)
}

/**
 * 订单管理-库存管理 - 盘亏盈单 - 列表
 其他信息不允许编辑
 * @param data
 * @returns {*}
 */
export const postCheckLossOrWinOrderList = (data = null) => {
  return Vue.prototype.$post('/Check/inventory', data)
}

/**
 * 订单管理-库存管理 - 盘亏盈单 - 详情
 其他信息不允许编辑
 * @param data
 * @returns {*}
 */
export const postCheckLossOrWinOrderDetails = (data = null) => {
  return Vue.prototype.$post('/Check/inventory_info', data)
}
