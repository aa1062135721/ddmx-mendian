import Vue from 'vue'

/**
 * 登录的时候，获取验证码
 * @returns {Promise|*}
 */
export const postLoginGetCode = (data = null) => {
  return Vue.prototype.$post('/login/getCode', data)
}

/**
 * 登录接口 根据手机号和验证码登录
 * @returns {Promise|*}
 */
export const postLoginByCode = (data = null) => {
  return Vue.prototype.$post('/login/userLogin', data)
}

/**
 * 登录接口
 * @returns {Promise|*}
 */
export const postLogin = (data = null) => {
  return Vue.prototype.$post('/login/doLogin', data)
}

/**
 * 登录后获取用户信息接口
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
 * 收银大屏-服务商品分类列表
 * @param data
 * @returns {*}
 */
export const postServiceCategory = (data = null) => {
  return Vue.prototype.$post('/index/getServiceCategory', data)
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
 * 收银大屏-购买服务卡-服务卡列表-详情
 * @param data
 * @returns {*}
 */
export const postBuyServiceCardsDetails = (data = null) => {
  return Vue.prototype.$post('/ticket/ticket_details', data)
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
 * 支出管理-营业支出的增加和编辑
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
  return Vue.prototype.$post('/Expenditure/expenditure_delete', data)
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
 * 订单管理-门店订单 - 可退货商品信息 - 退货时加载列表
 * @param data
 * @returns {*}
 */
export const postOrderReturnGoodsList = (data = null) => {
  return Vue.prototype.$post('/order/refund', data)
}

/**
 * 订单管理-门店订单 - 选择了退货商品后 - 退货
 * @param data
 * @returns {*}
 */
export const postOrderReturnConfirm = (data = null) => {
  return Vue.prototype.$post('/order/refund_order', data)
}

/**
 * 订单管理-门店订单详情 - 退货商品信息
 * @param data
 * @returns {*}
 */
export const postOrderDetailsReturnGoods = (data = null) => {
  return Vue.prototype.$post('/order/order_refund', data)
}

/**
 * 订单管理-服务卡订单-列表
 * @param data
 * @returns {*}
 */
export const postServiceCardOrderList = (data = null) => {
  return Vue.prototype.$post('/order/ticket_list', data)
}

/**
 * 订单管理-服务卡订单-服务卡退单时数据加载
 * @param data
 * @returns {*}
 */
export const postReturnServiceCardOrder = (data = null) => {
  return Vue.prototype.$post('/order/ticketrefund', data)
}

/**
 * 订单管理-服务卡订单-服务卡退单
 * @param data
 * @returns {*}
 */
export const postReturnServiceCardOrderConfirm = (data = null) => {
  return Vue.prototype.$post('/order/ticket_refund', data)
}

/**
 * 订单管理-服务卡订单-退单详情
 * @param data
 * @returns {*}
 */
export const postServiceCardReturnDetail = (data = null) => {
  return Vue.prototype.$post('/order/ticket_list_details', data)
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
 * 库存管理 - 盘点单 -新增盘点单时 获取商品别表
 * @param data
 * @returns {*}
 */
export const postCheckOrderAddGoodList = (data = null) => {
  return Vue.prototype.$post('/Check/add', data)
}

/**
 * 库存管理 - 盘点单 -新增盘点单
 * @param data
 * @returns {*}
 */
export const postCheckOrderAdd = (data = null) => {
  return Vue.prototype.$post('/Check/doPost', data)
}

/**
 * 库存管理 - 盘点单 -详情
 * @param data
 * @returns {*}
 */
export const postCheckOrderInfo = (data = null) => {
  return Vue.prototype.$post('/Check/info', data)
}

/**
 * 库存管理 - 盘点单 -删除
 * @param data
 * @returns {*}
 */
export const postCheckOrderDel = (data = null) => {
  return Vue.prototype.$post('/Check/del', data)
}

/**
 * 库存管理 - 盘点单 -删除
 * @param data
 * @returns {*}
 */
export const postCheckOrderConfirm = (data = null) => {
  return Vue.prototype.$post('/Check/confirm', data)
}

/**
 * 库存管理 - 盘点单 -编辑 --只允许 编辑 备注信息，其他信息不允许编辑
 * @param data
 * @returns {*}
 */
export const postCheckOrderEdit = (data = null) => {
  return Vue.prototype.$post('/Check/editRemarks', data)
}

/**
 * 库存管理 - 盘亏盈单 - 列表
 其他信息不允许编辑
 * @param data
 * @returns {*}
 */
export const postCheckLossOrWinOrderList = (data = null) => {
  return Vue.prototype.$post('/Check/inventory', data)
}

/**
 * 库存管理 - 盘亏盈单 - 详情
 其他信息不允许编辑
 * @param data
 * @returns {*}
 */
export const postCheckLossOrWinOrderDetails = (data = null) => {
  return Vue.prototype.$post('/Check/inventory_info', data)
}

/**
 * 库存管理 - 调拨单 - 列表
 其他信息不允许编辑
 * @param data
 * @returns {*}
 */
export const postTransferSlipList = (data = null) => {
  return Vue.prototype.$post('/allot/index', data)
}

/**
 * 库存管理 - 调拨单 - 新增
 * @param data
 * @returns {*}
 */
export const postTransferSlipAdd = (data = null) => {
  return Vue.prototype.$post('/allot/allot_add', data)
}

/**
 * 库存管理 - 调拨单 - 删除
 * @param data
 * @returns {*}
 */
export const postTransferSlipDel = (data = null) => {
  return Vue.prototype.$post('/allot/del', data)
}

/**
 * 库存管理 - 调拨单 - 发货弹框-获取调拨单信息
 * @param data
 * @returns {*}
 */
export const postTransferSlipSendGoodsGetInfo = (data = null) => {
  return Vue.prototype.$post('/allot/out_shop_list', data)
}

/**
 * 库存管理 - 调拨单 - 发货弹框-获取商品列表
 * @param data
 * @returns {*}
 */
export const postTransferSlipSendGoodsGetGoodList = (data = null) => {
  return Vue.prototype.$post('/allot/out_shop_item', data)
}

/**
 * 库存管理 - 调拨单 - 发货
 * @param data
 * @returns {*}
 */
export const postTransferSlipSendGoods = (data = null) => {
  return Vue.prototype.$post('/allot/out_shop', data)
}

/**
 * 库存管理 - 调拨单 - 取消发货
 * @param data
 * @returns {*}
 */
export const postTransferSlipSendGoodsCancel = (data = null) => {
  return Vue.prototype.$post('/allot/shop_cancel', data)
}

/**
 * 库存管理 - 调拨单 - 详情
 * @param data
 * @returns {*}
 */
export const postTransferSlipDetails = (data = null) => {
  return Vue.prototype.$post('/allot/allot_confirm_list', data)
}

/**
 * 库存管理 - 调拨单 - 详情-商品列表 ?确认收货列表表单
 * @param data
 * @returns {*}
 */
export const postTransferSlipGoodsDetails = (data = null) => {
  return Vue.prototype.$post('/allot/allot_confirm_list_table', data)
}

/**
 * 库存管理 - 调拨单 - 确认收货
 * @param data
 * @returns {*}
 */
export const postTransferSlipConfirmGoods = (data = null) => {
  return Vue.prototype.$post('/allot/confirm_shop', data)
}

/**
 * 库存管理 - 调拨单 - 新增调拨，选择商品，获取商品列表
 * @param data
 * @returns {*}
 */
export const postTransferSlipGetGoodList = (data = null) => {
  return Vue.prototype.$post('/allot/allot_item', data)
}

/**
 * 库存管理 - 调拨单 - 调入，调出 仓库列表
 * @param data
 * @returns {*}
 */
export const postShopList = (data = null) => {
  return Vue.prototype.$post('/index/shop_list', data)
}

/**
 * 库存管理 - 库存查询 - 获取列表
 * @param data
 * @returns {*}
 */
export const postCheckStockGoodsList = (data = null) => {
  return Vue.prototype.$post('/Check/stock_about', data)
}

/**
 * 会员管理 - 获取会员列表
 * @param data
 * @returns {*}
 */
export const postMemberList = (data = null) => {
  return Vue.prototype.$post('/member/memberList', data)
}

/**
 * 统计报表 - 支出统计
 * @param data
 * @returns {*}
 */
export const postStatisticsExpenditure = (data = null) => {
  return Vue.prototype.$post('/Statistics/expenditure', data)
}

/**
 * 统计报表 - 会员统计
 * @param data
 * @returns {*}
 */
export const postStatisticsMember = (data = null) => {
  return Vue.prototype.$post('/Statistics/member', data)
}

/**
 * 统计报表 - 充值统计
 * @param data
 * @returns {*}
 */
export const postStatisticsCz = (data = null) => {
  return Vue.prototype.$post('/Statistics/cz', data)
}

/**
 * 统计报表 - 销量统计
 * @param data
 * @returns {*}
 */
export const postStatisticsVolume = (data = null) => {
  return Vue.prototype.$post('/Statistics/volume', data)
}

/**
 * 统计报表 - 服务统计
 * @param data
 * @returns {*}
 */
export const postStatisticsService = (data = null) => {
  return Vue.prototype.$post('/Statistics/service', data)
}

/**
 * 统计报表 - 服务统计
 * @param data
 * @returns {*}
 */
export const postStatisticsOrder = (data = null) => {
  return Vue.prototype.$post('/Statistics/order', data)
}
