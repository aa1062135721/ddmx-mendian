<template>
    <div class="order-manage-page">
      <el-tabs v-model="requestData.type" @tab-click="handleClick">
        <el-tab-pane label="门店订单" name="1">
          <div class="search-condition">
            <div class="select">
              <el-select v-model="requestData.waiter_id" clearable placeholder="选择服务人员" >
                <el-option
                  v-for="item in waiter"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select v-model="requestData.pay_way" clearable placeholder="选中支付方式">
                <el-option
                  v-for="item in payWayList1"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width: 148px;">
              <el-select v-model="requestData.status" clearable placeholder="选择状态">
                <el-option
                  v-for="item in orderStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width: 148px;">
              <el-select v-model="requestData.goods_type" clearable placeholder="选择商品类型">
                <el-option
                  v-for="item in goodsType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width:368px;height:48px;">
              <el-input
                v-model="requestData.search"
                placeholder="请输入需查询的会员手机号/订单号"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="search-btns">
            <span class="span">筛选</span>
            <el-button class="btn" @click="chooseTime(1)" :class="{'active' : requestData.timeBtnValue === 1}">今日</el-button>
            <el-button class="btn" @click="chooseTime(2)" :class="{'active' : requestData.timeBtnValue === 2}">昨日</el-button>
            <el-button class="btn" @click="chooseTime(3)" :class="{'active' : requestData.timeBtnValue === 3}">本周</el-button>
            <el-date-picker
              @focus="chooseTimeDIY"
              v-model="requestData.date"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <div class="select" style="margin-left: 20px">
              <el-button type="primary"  @click="requestData.page = 1;getOrdersList()">搜索</el-button>
            </div>
          </div>
          <div class="serch-table">
            <el-table :data="responseData1.data" border style="width: 100%;" height="565">
              <el-table-column label="订单信息" width="300px">
                <template slot-scope="scope">
                  <div v-html="scope.row.message"></div>
                </template>
              </el-table-column>
              <el-table-column label="商品信息">
                <template slot-scope="scope">
                  <div v-html="scope.row.item_list"></div>
                </template>
              </el-table-column>
              <el-table-column label="商品价格">
                <template slot-scope="scope">
                  <div v-html="scope.row.price_list"></div>
                </template>
              </el-table-column>
              <el-table-column label="购买数量" width="80px">
                <template slot-scope="scope">
                  <div v-html="scope.row.num_list"></div>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="付款金额" width="100px"></el-table-column>
              <el-table-column prop="overtime" label="交易时间" width="155px"></el-table-column>
              <el-table-column label="服务人员">
                <template slot-scope="scope">
                  <div v-html="scope.row.waiter_list"></div>
                </template>
              </el-table-column>
              <el-table-column prop="order_status" label="状态" width="70px"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="showDoorShopOrderReturnDialog(scope.row.id)" v-if="scope.row.status !== -6">退单</el-button>
                  <el-button size="mini" type="text" @click="showOrderDetails(scope.row.id)">订单详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="pageSizeChange"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="requestData.limit"
              @current-change="responseDataOnePageCurrentChange"
              :current-page.sync="requestData.page"
              :total="responseData1.count">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="充值订单" name="3">
          <div class="search-condition">
            <div class="select">
              <el-select v-model="requestData.waiter_id" clearable placeholder="选择服务人员" >
                <el-option
                  v-for="item in waiter"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select v-model="requestData.pay_way" clearable placeholder="选中支付方式">
                <el-option
                  v-for="item in payWayList3"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
<!--            <div class="select" style="width: 148px;">-->
<!--              <el-select v-model="requestData.status" clearable placeholder="选择状态">-->
<!--                <el-option-->
<!--                  v-for="item in orderStatus"-->
<!--                  :key="item.id"-->
<!--                  :label="item.name"-->
<!--                  :value="item.id">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </div>-->
            <div class="select" style="width:368px;height:48px;">
              <el-input
                v-model="requestData.search"
                placeholder="请输入需查询的会员手机号/订单号"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="search-btns">
            <span class="span">筛选</span>
            <el-button class="btn" @click="chooseTime(1)" :class="{'active' : requestData.timeBtnValue === 1}">今日</el-button>
            <el-button class="btn" @click="chooseTime(2)" :class="{'active' : requestData.timeBtnValue === 2}">昨日</el-button>
            <el-button class="btn" @click="chooseTime(3)" :class="{'active' : requestData.timeBtnValue === 3}">本周</el-button>
            <el-date-picker
              @focus="chooseTimeDIY"
              v-model="requestData.date"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <div class="select" style="margin-left: 20px">
              <el-button type="primary" @click="requestData.page = 1;getOrdersList()">搜索</el-button>
            </div>
          </div>
          <div class="serch-table">
            <el-table :data="responseData3.data" border style="width: 100%;" height="565">
              <el-table-column prop="sn" label="订单号"></el-table-column>
              <el-table-column label="会员账号">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getMemberInfo(scope.row.member_id)">{{scope.row.mobile}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="充值金额"></el-table-column>
              <el-table-column prop="pay_way" label="付款方式"></el-table-column>
              <el-table-column prop="overtime" label="交易时间"></el-table-column>
              <el-table-column prop="waiter" label="服务人员"></el-table-column>
<!--              <el-table-column label="服务人员">-->
<!--                <template slot-scope="scope">-->
<!--                  <el-button type="text" size="small" @click="getWaiterInfo(scope.row.waiter_id)">{{scope.row.waiter}}</el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="showOrderDetails(scope.row.id)">订单详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="pageSizeChange"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="requestData.limit"
              @current-change="responseDataOnePageCurrentChange"
              :current-page.sync="requestData.page"
              :total="responseData3.count">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务卡订单" name="2">
          <div class="search-condition">
            <div class="select">
              <el-select v-model="requestData.waiter_id" clearable placeholder="选择服务人员" >
                <el-option
                  v-for="item in waiter"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select v-model="requestData.pay_way" clearable placeholder="选中支付方式">
                <el-option
                  v-for="item in payWayList2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width: 148px;">
              <el-select v-model="requestData.status" clearable placeholder="选择状态">
                <el-option
                  v-for="item in orderStatusServiceCardOrder"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width:368px;height:48px;">
              <el-input
                v-model="requestData.search"
                placeholder="请输入需查询的会员手机号/订单号"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="search-btns">
            <span class="span">筛选</span>
            <el-button class="btn" @click="chooseTime(1)" :class="{'active' : requestData.timeBtnValue === 1}">今日</el-button>
            <el-button class="btn" @click="chooseTime(2)" :class="{'active' : requestData.timeBtnValue === 2}">昨日</el-button>
            <el-button class="btn" @click="chooseTime(3)" :class="{'active' : requestData.timeBtnValue === 3}">本周</el-button>
            <el-date-picker
              @focus="chooseTimeDIY"
              v-model="requestData.date"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <div class="select" style="margin-left: 20px">
              <el-button type="primary" @click="requestData.page = 1;getOrdersList()">搜索</el-button>
            </div>
          </div>
          <div class="serch-table">
            <el-table :data="responseData2.data" border style="width: 100%;" height="565">
              <el-table-column prop="sn" label="订单号"></el-table-column>
              <el-table-column label="会员账号">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getMemberInfo(scope.row.member_id)">{{scope.row.mobile}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="real_price" label="付款金额"></el-table-column>
              <el-table-column prop="pay_way" label="付款方式"></el-table-column>
              <el-table-column prop="overtime" label="交易时间"></el-table-column>
              <el-table-column label="服务人员">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getWaiterInfo(scope.row.waiter_id)">{{scope.row.waiter}}</el-button>
                </template>
              </el-table-column>
              <el-table-column label="使用情况">
                <template slot-scope="scope">
                 <span v-if="scope.row.status === 0">未激活</span>
                 <span v-if="scope.row.status === 1">待使用</span>
                 <span v-if="scope.row.status === 2">已使用</span>
                 <span v-if="scope.row.status === 3">已过期</span>
                 <span v-if="scope.row.status === 4">已退卡</span>
                </template>
              </el-table-column>
              <el-table-column prop="o_status" label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
<!--                  <el-button size="mini" @click="" type="text">订单详情</el-button>-->
                  <el-button size="mini" @click="showServiceCardReturnDetailDialog(scope.row.id)" type="text" v-if="scope.row.status === 4">退单详情</el-button>
                  <el-button size="mini"  @click="showServiceCardDialog(scope.row.id)" type="text" v-if="scope.row.refund">退单</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="pageSizeChange"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="requestData.limit"
              @current-change="responseDataOnePageCurrentChange"
              :current-page.sync="requestData.page"
              :total="responseData2.count">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 会员详情-->
      <el-dialog class="order-manage-page-member-info" title="会员详情" :visible.sync="memberInfoDialog.isShow" width="280px" :center="true">
          <div>
            <div class="content">
              会员昵称：{{memberInfoDialog.memberInfo.nickname}}
            </div>
            <div class="content">
              手机号码：{{memberInfoDialog.memberInfo.mobile}}
            </div>
            <div class="content">
              所属门店：{{memberInfoDialog.memberInfo.shop_code}}
            </div>
            <div class="content">
              会员等级：{{memberInfoDialog.memberInfo.level}}
            </div>
            <div class="content">
              加入时间：{{memberInfoDialog.memberInfo.addtime}}
            </div>
          </div>
      </el-dialog>
      <!-- 服务人员详情-->
      <el-dialog class="order-manage-page-member-info" title="服务人员详情" :visible.sync="waiterInfoDialog.isShow" width="280px" :center="true">
        <div>
          <div class="content">
            员工姓名：{{waiterInfoDialog.waiterInfo.name}}
          </div>
          <div class="content">
            手机号码：{{waiterInfoDialog.waiterInfo.mobile}}
          </div>
          <div class="content">
            所属门店：{{waiterInfoDialog.waiterInfo.shop}}
          </div>
          <div class="content">
            所属职位：{{waiterInfoDialog.waiterInfo.type}}
          </div>
          <div class="content">
            入职时间：{{waiterInfoDialog.waiterInfo.addtime}}
          </div>
        </div>
      </el-dialog>

      <!-- 门店订单--订单详情弹框-->
      <el-dialog class="order-details-dialog" title="商品订单详情" :visible.sync="orderDetailsDialog1.isShow" width="968px" :center="true">
        <div>
          <div>
            <div class="title">订单信息</div>
            <div class="content clear-both">
              <div class="float-left">交易时间：{{orderDetailsDialog1.responseData.time}}</div>
              <div class="float-right">交易门店：{{orderDetailsDialog1.responseData.is_online}}</div>
            </div>
          </div>
          <div>
            <div class="title">收款信息</div>
            <div class="content clear-both">
              <div class="float-left">应收金额：{{orderDetailsDialog1.responseData.old_amount}}</div>
              <div class="float-right">实收金额：{{orderDetailsDialog1.responseData.amount}}</div>
            </div>
            <div class="content clear-both">
              <div class="float-left">收款方式：{{orderDetailsDialog1.responseData.pay_way}}</div>
            </div>
          </div>
          <div v-if="orderDetailsDialog1.responseData.member_id">
            <div class="title">会员信息</div>
            <div class="content clear-both">
              <div class="float-left">会员账号：{{orderDetailsDialog1.responseData.member ? orderDetailsDialog1.responseData.member.mobile : ''}}</div>
              <div class="float-right">会员昵称：{{orderDetailsDialog1.responseData.member  ? orderDetailsDialog1.responseData.member.nickname : ''}}</div>
            </div>
            <div class="content clear-both">
              <div class="float-left">会员等级：{{orderDetailsDialog1.responseData.member ? orderDetailsDialog1.responseData.member.level_name : ''}}</div>
              <div class="float-right">会员余额：{{orderDetailsDialog1.responseData.member ? orderDetailsDialog1.responseData.member.money : ''}}</div>
            </div>
          </div>
          <div>
            <div class="title">商品信息</div>
            <div>
              <el-table :data="orderDetailsDialog1.responseGoodList" border style="width: 100%;">
                <el-table-column prop="title" label="商品名称" width="180"></el-table-column>
                <el-table-column prop="num" label="数量" width="180"></el-table-column>
                <el-table-column prop="cost_price" label="成本价"></el-table-column>
                <el-table-column prop="price" label="单价" width="180"></el-table-column>
                <el-table-column prop="all_price" label="付款价格"></el-table-column>
              </el-table>
            </div>
          </div>
          <div v-if="orderDetailsDialog1.responseReturnGoodList.length">
            <div class="title">退单信息</div>
            <div>
              <el-table :data="orderDetailsDialog1.responseReturnGoodList" border style="width: 100%;">
                <el-table-column prop="r_sn" label="退货订单号"></el-table-column>
                <el-table-column prop="r_number" label="退货数量"></el-table-column>
                <el-table-column prop="r_amount" label="退货总金额"></el-table-column>
                <el-table-column prop="add_time" label="申请时间"></el-table-column>
                <el-table-column prop="dealwith_time" label="处理时间"></el-table-column>
                <el-table-column prop="r_status" label="状态"></el-table-column>
                <el-table-column prop="reason" label="原因"></el-table-column>
                <el-table-column prop="remarks" label="备注"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-dialog>
      <!-- 门店订单--退款处理-->
      <el-dialog class="order-details-dialog" title="退款处理" :visible.sync="returnOrderDialog1.isShow" width="968px" :center="true">
        <div>
          <div>
            <el-table  :data="returnOrderDialog1.responseGoodsData" border style="width: 100%;"  @selection-change="choosesHandleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="subtitle" label="商品名称"></el-table-column>
              <el-table-column prop="num" label="商品购买数量"></el-table-column>
              <el-table-column prop="real_price" label="商品成交价格"></el-table-column>
              <el-table-column prop="refund_price" label="最高可退货单价"></el-table-column>
              <el-table-column  label="请输入退货单价">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.my_return_price"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="refund_num" label="最高可退货数量"></el-table-column>
              <el-table-column  label="请输入退货数量">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.my_return_num"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top: 20px;">
            <el-form ref="form"  label-width="100px" label-position="left">
              <el-form-item label="退款方式" required>
                <el-radio-group v-model="returnOrderDialog1.type">
                  <el-radio label="cash">现金退款</el-radio>
                  <el-radio label="balance">余额退款</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="退货原因:" required>
                <el-select v-model="returnOrderDialog1.reason_id" placeholder="选择退货原因" @change="returnResultChange">
                  <el-option  v-for="item in returnOrderDialog1.returnOrderResult" :label="item.name" :value="item.id"  :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="其他原因:" required v-if="returnOrderDialog1.reason_id === 0">
                <el-input type="textarea" v-model="returnOrderDialog1.reason" placeholder="请输入其他原因"></el-input>
              </el-form-item>
              <el-form-item label="备注:" required>
                <el-input type="textarea" v-model="returnOrderDialog1.remarks" placeholder="请输入备注信息"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div style="margin-top: 20px;height: 50px;text-align: center;">
            <el-button @click="returnOrderDialog1.isShow = false">取消</el-button>
            <el-button @click="showDoorShopOrderReturnConfirm" type="primary">退货</el-button>
          </div>
        </div>
      </el-dialog>

      <!-- 充值订单--订单详情弹框-->
      <el-dialog class="order-details-dialog" title="充值订单详情" :visible.sync="orderDetailsDialog3.isShow" width="500px" :center="true">
        <div>
          <div>
            <div class="title">订单信息</div>
            <div class="content clear-both">
              <div class="float-left">交易时间：{{orderDetailsDialog3.responseData.time}}</div>
              <div class="float-right">交易门店：{{orderDetailsDialog3.responseData.is_online}}</div>
            </div>
          </div>
          <div>
            <div class="title">收款信息</div>
            <div class="content clear-both">
              <div class="float-left">应收金额：{{orderDetailsDialog3.responseData.old_amount}}</div>
              <div class="float-right">实收金额：{{orderDetailsDialog3.responseData.amount}}</div>
            </div>
            <div class="content clear-both">
              <div class="float-left">收款方式：{{orderDetailsDialog3.responseData.pay_way}}</div>
            </div>
          </div>
          <div>
            <div class="title">会员信息</div>
            <div class="content clear-both">
              <div class="float-left">会员账号：{{orderDetailsDialog3.responseData.member ? orderDetailsDialog3.responseData.member.mobile : ''}}</div>
              <div class="float-right">会员昵称：{{orderDetailsDialog3.responseData.member  ? orderDetailsDialog3.responseData.member.nickname : ''}}</div>
            </div>
            <div class="content clear-both">
              <div class="float-left">会员等级：{{orderDetailsDialog3.responseData.member ? orderDetailsDialog3.responseData.member.level_name : ''}}</div>
              <div class="float-right">会员余额：{{orderDetailsDialog3.responseData.member ? orderDetailsDialog3.responseData.member.money : ''}}</div>
            </div>
          </div>
        </div>
      </el-dialog>

      <!-- 服务卡订单--退款处理-->
      <el-dialog class="order-details-dialog" title="服务卡订单退单" :visible.sync="returnOrderDialog2.isShow" width="700px" :center="true">
        <div>
          <el-form ref="form"  label-width="80px" label-position="left" :inline="true" class="demo-form-inline">
            <el-form-item label="卡卷类型">
              <el-input :value="returnOrderDialog2.responseData.card.type"></el-input>
            </el-form-item>
            <el-form-item label="使用月份">
              <el-input :value="returnOrderDialog2.responseData.month || '次卡'"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="form"  label-width="80px" label-position="left" :inline="true" class="demo-form-inline">
            <el-form-item label="激活时间">
              <el-input :value="returnOrderDialog2.responseData.start"></el-input>
            </el-form-item>
            <el-form-item label="到期时间">
              <el-input :value="returnOrderDialog2.responseData.end"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="form"  label-width="80px" label-position="left" :inline="true" class="demo-form-inline">
            <el-form-item label="支付金额">
              <el-input :value="returnOrderDialog2.responseData.real_price + '元'"></el-input>
            </el-form-item>
            <el-form-item label="使用金额">
              <el-input :value="returnOrderDialog2.responseData.card.money + '元'"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="form"  label-width="80px" label-position="left" class="demo-dynamic">
            <el-form-item label="退卡原因" required>
              <el-select v-model="returnOrderDialog2.requestData.reason_id" placeholder="请选择退卡原因" @change="serviceCardReturnResultChange">
                <el-option  v-for="item in returnOrderDialog2.returnOrderResult" :label="item.name" :value="item.id"  :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他原因" v-if="returnOrderDialog2.requestData.reason_id === 0">
              <el-input type="textarea" v-model="returnOrderDialog2.requestData.reason"></el-input>
            </el-form-item>
            <el-form-item label="退款方式" required>
              <el-radio-group v-model="returnOrderDialog2.requestData.type">
                <el-radio label="cash">现金退款</el-radio>
                <el-radio label="balance">余额退款</el-radio>
<!--                <el-radio label="card">银行卡</el-radio>-->
              </el-radio-group>
            </el-form-item>
            <el-form-item label="退款金额">
              <el-input :value="returnOrderDialog2.responseData.card.balance + '元'"></el-input>
            </el-form-item>
            <el-form-item label="备注" required>
              <el-input type="textarea" v-model="returnOrderDialog2.requestData.remarks"></el-input>
            </el-form-item>
            <div style="text-align: center;">
              <el-button @click="returnOrderDialog2.isShow = false">取消</el-button>
              <el-button @click="serviceCardReturn" type="primary">退款</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
      <!-- 服务卡订单--退单详情-->
      <el-dialog class="order-details-dialog" title="服务卡订单退单详情" :visible.sync="returnDetailDialog2.isShow" width="500px" :center="true">
        <div>
          <div>
            <div class="content clear-both">
              <div class="float-left">订单编号：{{returnDetailDialog2.responseData.o_sn}}</div>
              <div class="float-right">退单编号：{{returnDetailDialog2.responseData.r_sn}}</div>
            </div>
          </div>
          <div>
            <div class="content clear-both">
              <div class="float-left">卡卷类型：{{returnDetailDialog2.responseData.type_text}}</div>
              <div class="float-right">使用月份：{{returnDetailDialog2.responseData.ticket.months || '次卡'}}</div>
            </div>
          </div>
          <div>
            <div class="content clear-both">
              <div class="float-left">激活时间：{{returnDetailDialog2.responseData.ticket.start}}</div>
              <div class="float-right">到期时间：{{returnDetailDialog2.responseData.ticket.end}}</div>
            </div>
          </div>
          <div>
            <div class="content clear-both">
              <div class="float-left">支付金额：{{returnDetailDialog2.responseData.ticket.real_price + '元'}}</div>
              <div class="float-right">退款金额：{{returnDetailDialog2.responseData.r_amount + '元'}}</div>
            </div>
          </div>
          <div>
            <div class="content clear-both">
              <div class="float-left">申请人员：{{returnDetailDialog2.responseData.ticket.waiter}}</div>
              <div class="float-right">申请时间：{{returnDetailDialog2.responseData.ticket.create_time}}</div>
            </div>
          </div>
          <div>
            <div class="content clear-both">
              <div class="float-left">退款方式：{{(returnDetailDialog2.responseData.otype === 1) ?"现金退款":(returnDetailDialog2.responseData.otype === 2 ? "余额退款" : '银行卡退款')}}</div>
              <div class="float-right">退款状态：{{(returnDetailDialog2.responseData.r_status === 0) ?"申请中":(returnDetailDialog2.responseData.r_status === 1 ? "已完成" : '取消')}}</div>
            </div>
          </div>
          <div class="content clear-both" style="height: 80px;">
            <div class="float-left">
              退卡原因:<br>
              <el-input type="textarea" v-model="returnDetailDialog2.responseData.reason" :disabled="true"></el-input>
            </div>
            <div class="float-right">
              备注:<br>
              <el-input type="textarea" v-model="returnDetailDialog2.responseData.remarks" :disabled="true"></el-input>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { postOrderList, postWaiter, postOrderWaiter, postMemberInfo, postOrderDetails, postOrderDetailsGoods, postReturnServiceCardOrder, postReturnServiceCardOrderConfirm, postServiceCardOrderList, postOrderDetailsReturnGoods, postOrderReturnGoodsList, postOrderReturnConfirm, postServiceCardReturnDetail, } from '../../api/getData'
import { changeTime, getWeekStartDateAndEndDateRange } from '../../utils'

export default {
  name: 'OrderManage', // 订单管理
  data () {
    return {
      /**
       * 公共参数
       */
      // 会员信息弹框
      memberInfoDialog: {
        isShow: false,
        memberInfo: {
          nickname: '涵涵妈',
          mobile: '18725928054',
          shop_code: '两江时光店',
          level: '普通会员',
          addtime: '2017-08-15 12:52:04'
        }
      },
      // 服务人员信息弹框
      waiterInfoDialog: {
        isShow: false,
        waiterInfo: {
          name: '测试员工',
          mobile: '15223622442',
          shop: '测试门店10',
          type: '水育,大保健,艾灸',
          addtime: '2018-11-02 09:32:27'
        }
      },
      // 选择服务人员
      waiter: [
        // {
        //   id: 1, // 服务员id  当服务员的id为0师表示为当前登录的店长
        //   name: '管理员', // 服务员名称
        //   type: '店长' // 服务类型
        // },
      ],
      requestData: {
        // 分页 公共参数
        page: 1,
        // 每页的条数 公共参数
        limit: 10,
        // 当前选中的服务人员 公共参数
        waiter_id: '',
        // 当前选中的支付方式 公共参数
        pay_way: '',
        // 选择订单状态 公共参数
        status: '',
        //门店订单需要的参数
        goods_type: 0,
        // 请输入需查询的会员手机号/订单号 公共参数
        search: '',
        // 订单类型 1=商品订单，2=服务卡订单 3=充值购卡 4=收银台收银 公共参数
        type: '1',
        // 筛选时间 自定义时间 公共参数
        date: [],
        // 当前选择的时间// 1=今日，2=昨日，3=本周 0=未选择 公共参数
        timeBtnValue: 0,
        startTime: '', // 开始时间 公共参数
        endTime: '' // 结束时间 公共参数
      },
      rules:{
        //退货原因
        reason: [
          { required: true, message: '请填写退货原因', trigger: 'blur' }
        ]
      },

      /**
       * 门店订单
       */
      // 门店订单-选择订单状态
      orderStatus: [
        {id: 2, name: '正常'},
        {id: -6, name: '已退单'},
        {id: -3, name: '有退单'},
      ],
      // 选择支付方式：1=微信支付 2=支付宝 3=余额(会员卡)4=银行卡5=现金6=美团7=赠送8=门店自用 9=兑换10=包月服务11=定制疗程99=管理员充值-->
      payWayList1: [
        {id: 1, name: '微信'},
        {id: 2, name: '支付宝'},
        {id: 3, name: '余额'},
        {id: 4, name: '银行卡'},
        {id: 5, name: '现金'},
      ],
      // 门店订单-商品类型
      goodsType: [
        {id: 0, name: '全部'},
        {id: 1, name: '非外包商品'},
        {id: 2, name: '非外包服务'},
        {id: 3, name: '外包商品'},
        {id: 4, name: '外包服务'},
      ],
      // 门店订单
      responseData1: {
        data: [],
        count: 10
      },
      // 门店订单-退单弹框
      returnOrderDialog1: {
        isShow: false,
        reason_id:'',//当前选择的推过原因的id，0为其他
        reason:'',//其他原因，自己输入
        type:'',
        id: '',
        remarks:'',
        //选中的退货商品
        multipleSelection: [],
        // 退货原因列表
        returnOrderResult: [
          {id: 1, name: '商品质量问题'},
          {id: 2, name: '商品不一致，客户退货'},
          {id: 0, name: '其他'}
        ],
        //可退货的商品列表
        responseGoodsData:[
          {
            subtitle: "新西兰S-26惠氏婴幼儿奶粉2段900g/罐",
            num: 2,
            price: "179.00",
            real_price: "179.00",
            refund_price: "179.00",
            refund_num: 2
          },
        ]
      },
      // 门店订单-订单详情弹窗内容
      orderDetailsDialog1: {
        isShow: false,
        responseData: {
          id: 2,
          sn: 'XM155937958663',
          time: '2019-06-02 18:49:46',
          shop_code: '总店',
          is_online: '门店收银',
          waiter: '测试员工2',
          old_amount: '136.00',
          amount: '130.00',
          member: {
            mobile: '17723582121',
            nickname: '罗文2222',
            level: '普通会员',
            money: '29.01'
          },
          pay_way: '现金支付'
        },
        responseGoodList: [
          {
            id: 1, // 订单商品表的id
            subtitle: '新西兰S-26惠氏婴幼儿奶粉2段900g/罐', // 商品购买时的商品名称
            num: 2, // 数量
            refund: 0, // 退货数量
            price: '179.00', // 原价
            real_price: '179.00', // 实际
            pay_all_price: 358 // 付款总数
          },
          {
            id: 2,
            subtitle: '安琪憨贝洁婴儿柔湿巾80片1包装',
            num: 2,
            refund: 2,
            price: '151.00',
            real_price: '151.00',
            pay_all_price: 302
          }
        ],
        responseReturnGoodList:[
          {
            id: 1,
            r_sn: "OR156056550030",
            r_number: 1,
            r_amount: "179.00",
            add_time: "2019-06-15 10:25:00",
            dealwith_time: "2019-06-15 10:25:00",
            r_status: "完成",
            reason: "商品不一致，客户退货",
            remarks: ""
          },
        ]
      },

      /**
       * 充值订单
       */
      // 充值订单
      responseData3: {
        data: [],
        count: 10
      },
      // 充值订单-订单详情弹窗内容
      orderDetailsDialog3: {
        isShow: false,
        responseData: {
          id: 2,
          sn: 'XM155937958663',
          time: '2019-06-02 18:49:46',
          shop_code: '总店',
          is_online: '门店收银',
          waiter: '测试员工2',
          old_amount: '136.00',
          amount: '130.00',
          member: {
            mobile: '17723582121',
            nickname: '罗文2222',
            level: '普通会员',
            money: '29.01'
          },
          pay_way: '现金支付'
        },
        responseGoodList: [
          {
            id: 1, // 订单商品表的id
            subtitle: '新西兰S-26惠氏婴幼儿奶粉2段900g/罐', // 商品购买时的商品名称
            num: 2, // 数量
            refund: 0, // 退货数量
            price: '179.00', // 原价
            real_price: '179.00', // 实际
            pay_all_price: 358 // 付款总数
          },
          {
            id: 2,
            subtitle: '安琪憨贝洁婴儿柔湿巾80片1包装',
            num: 2,
            refund: 2,
            price: '151.00',
            real_price: '151.00',
            pay_all_price: 302
          }
        ]
      },
      // 选择支付方式：1=微信支付 2=支付宝 3=余额(会员卡)4=银行卡5=现金6=美团7=赠送8=门店自用 9=兑换10=包月服务11=定制疗程99=管理员充值-->
      payWayList3: [
        {id: 1, name: '微信'},
        {id: 2, name: '支付宝'},
        {id: 4, name: '银行卡'},
        {id: 5, name: '现金'},
      ],

      /**
       * 服务卡订单
       */
      //服务卡订单
      responseData2:{
        data: [],
        count: 0
      },
      // 服务卡订单-选择订单状态
      orderStatusServiceCardOrder: [
        {id: 0, name: '正常'},
        {id: 1, name: '退单'},
      ],
      // 选择支付方式：1=微信支付 2=支付宝 3=余额(会员卡)4=银行卡5=现金6=美团7=赠送8=门店自用 9=兑换10=包月服务11=定制疗程99=管理员充值-->
      payWayList2: [
        {id: 6, name: '美团'},
        {id: 7, name: '赠送'},
        {id: 8, name: '门店自用'},
      ],
      //服务卡订单-退单弹框
      returnOrderDialog2: {
        isShow: false,
        responseData:{
          id: 2,
          member_id: 2,
          order_id: 34,
          mobile: "13637765376",
          ticket_id: 1,
          status: 1,
          waiter: "荣天铭",
          waiter_id: 13,
          sn: "XM156481327221",
          start_time: 1564813302,
          end_time: 1584028799,
          type: 1,
          month: 0,
          year: 0,
          real_price: "126.00",
          card: {
            data: [
              {
               num: 20,
               s_num: 20,
               money: "60.00",
               service_id: 44,
               sname: "外包服务",
               price: 0
              }
            ],
            money: "0.00",
            type: "次卡",
            balance: "126.00"
          },
          start: "2019-08-03",
          end: "2020-03-12"
        },
        // 退货原因列表
        returnOrderResult: [
          {id: 1, name: '商品质量问题'},
          {id: 2, name: '商品不一致，客户退货'},
          {id: 0, name: '其他'}
        ],
        requestData:{
          id:'',
          reason_id:'',//退货原因列表中的id
          reason:'',//退货原因
          type:'',//退货方式 cash现金 balance余额退款 card 银行卡
          remarks:'',//备注
        },
      },
      //服务卡退单详情
      returnDetailDialog2:{
        isShow: false,
        responseData:{
          id: 8,
          order_id: 34,
          o_sn: "XM156481327221",
          r_sn: "OR156516404221",
          r_number: 1,
          r_amount: "126.00",
          r_status: 1,
          reason: "sdfadsfasdf",
          remarks: "sfadsfadsf",
          type: 1,
          update_time: 1565245615,
          dealwith_time: 1565245615,
          shop_id: 21,
          otype: 3,
          creator: "1",
          creator_id: 0,
          r_type: "3",
          status: 1,
          worker_id: 13,
          worker: "荣天铭",
          create_time: 1565164042,
          ticket: {
            id: 2,
            order_id: 34,
            shop_id: 21,
            member_id: 2,
            mobile: "13637765376",
            ticket_id: 1,
            status: 1,
            price: "188.00",
            real_price: "126.00",
            start_time: 1564813302,
            end_time: 1584028799,
            over_time: 0,
            use_over_time: null,
            day: 222,
            month: 0,
            year: 0,
            refund: 0,
            refund_time: 1565245615,
            create_time: "2019-08-03 14:21:12",
            waiter: "荣天铭",
            waiter_id: 13,
            type: 1,
            level_id: 6,
            log: 0,
            refund_id: 1,
            start: "2019-08-03",
            end: "2020-03-12"
          },
          type_text: "次卡"
        }
      },
    }
  },
  methods: {
    // 查看订单详情
    async showOrderDetails (id) {
      let data = {
        type:this.requestData.type,
        id
      }
      let data2 = {
        order_id: id,
        type: this.requestData.type,
      }
      switch (this.requestData.type) {
        case '1':
          this.orderDetailsDialog1.responseData = {}
          this.orderDetailsDialog1.responseGoodList = []
          this.orderDetailsDialog1.responseReturnGoodList = []
          await postOrderDetails(data).then(res => {
            if (res.code === '200') {
              this.orderDetailsDialog1.responseData = res.data
            }
          })
          await postOrderDetailsGoods(data2).then(res => {
            if (res.code === '200') {
              this.orderDetailsDialog1.responseGoodList = res.data
            }
          })
          await postOrderDetailsReturnGoods(data2).then(res => {
            if (res.code === '200')
              this.orderDetailsDialog1.responseReturnGoodList = res.data
          }).catch(err => {
            console.log(err)
          })
          this.orderDetailsDialog1.isShow = true
          break
        case '3':
          await postOrderDetails(data).then(res => {
            if (res.code === '200') {
              this.orderDetailsDialog3.responseData = res.data
            }
          })
          await postOrderDetailsGoods(data2).then(res => {
            if (res.code === '200') {
              this.orderDetailsDialog3.responseGoodList = res.data
              this.orderDetailsDialog3.isShow = true
            }
          })
          break
        case '2':

          break
      }
    },
    // 页码操作
    responseDataOnePageCurrentChange (val) {
      this.requestData.page = val
      this.getOrdersList()
    },
    // 页码操作
    pageSizeChange (val) {
      this.requestData.limit = val
      this.getOrdersList()
    },
    //根据订单类型获取订单列表
    getOrdersList() {
      switch (this.requestData.type) {
        case '1':
          this.getOrderList()
          break;
        case '2':
          this.getServiceCardOrderList()
          break;
        case '3':
          this.getOrderList()
          break;
      }
    },
    // 1=今日，2=昨日，3=本周
    chooseTime (type) {
      if (type === this.requestData.timeBtnValue) {
        this.requestData.timeBtnValue = 0
        this.requestData.date = []
        this.requestData.startTime = ''
        this.requestData.endTime = ''
        return
      }
      this.requestData.timeBtnValue = type
      switch (type) {
        case 1:
          this.requestData.startTime = changeTime(new Date().getTime())
          this.requestData.endTime = changeTime(new Date().getTime())
          this.requestData.date = []
          break
        case 2:
          this.requestData.startTime = changeTime(new Date().getTime() - 24 * 60 * 60 * 1000)
          this.requestData.endTime = changeTime(new Date().getTime() - 24 * 60 * 60 * 1000)
          this.requestData.date = []
          break
        case 3:
          let date = getWeekStartDateAndEndDateRange()
          this.requestData.startTime = date[0]
          this.requestData.endTime = date[1]
          this.requestData.date = []
          break
      }
    },
    // 自定义时间
    chooseTimeDIY () {
      this.requestData.startTime = ''
      this.requestData.endTime = ''
      this.requestData.timeBtnValue = 0
    },

    // tab切换
    handleClick () {
      this.requestData.page = 1
      this.requestData.status = ''
      this.requestData.timeBtnValue = 0
      this.requestData.date = []
      this.requestData.startTime = ''
      this.requestData.endTime = ''
      this.requestData.search = ''
      this.requestData.waiter_id = ''
      this.requestData.pay_way = ''
      this.getOrdersList()
    },

    // 获取服务员列表
    async getWaiterList () {
      await postWaiter(null).then(res => {
        if (res.data.length) {
          this.waiter = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取会员信息
    getMemberInfo (id = 1) {
      this.memberInfoDialog.isShow = true
      let data = {
        id,
        member_id: id
      }
      postMemberInfo(data).then(res => {
        this.memberInfoDialog.memberInfo = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取单个服务员信息
    async getWaiterInfo (id) {
      await postOrderWaiter({id: id}).then(res => {
        this.waiterInfoDialog.waiterInfo = res.data
        this.waiterInfoDialog.isShow = true
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取订单列表
    async getOrderList () {
      let data = {
        pay_way:this.requestData.pay_way,
        waiter_id:this.requestData.waiter_id,
        status:this.requestData.status,
        goods_type:this.requestData.goods_type,
        start_time:this.requestData.date.length ? this.requestData.date[0] : this.requestData.startTime,
        end_time:this.requestData.date.length ? this.requestData.date[1] : this.requestData.endTime,
        search: this.requestData.search, //订单号，或者会员手机号
        type: this.requestData.type, // 订单类型 1 门店订单  2 门店订单 3:充值购卡 4:收银台收款 5:购买卷卡（服务劵，服务卡...） 6:兑换券 默认为1
        page: this.requestData.page,
        limit: this.requestData.limit
      }

      await postOrderList(data).then(res => {
        if (res.code === '200') {
          if (res.data) {
            switch (this.requestData.type) {
              case '1':
                this.responseData1 = res
                break
              case '3':
                this.responseData3 = res
                break
            }
          }
        }
      })
    },

    //门店订单退单弹框展示
    async showDoorShopOrderReturnDialog (id) {
      this.returnOrderDialog1.responseGoodsData = []
      this.returnOrderDialog1.multipleSelection = []
      this.returnOrderDialog1.id = id
      await postOrderReturnGoodsList({order_id:id}).then(res => {
        if (res.code === '200'){
          if (res.data) {
            res.data.map(item => {
              item.my_return_num = ''
              item.my_return_price = ''
            })
            this.returnOrderDialog1.responseGoodsData = res.data
            this.returnOrderDialog1.isShow = true
          }
        }
      })
    },
    //选中或取消选择退货商品
    choosesHandleSelectionChange(val) {
      this.returnOrderDialog1.multipleSelection = val
    },
    //门店退货原因切换
    returnResultChange(id){
      this.returnOrderDialog1.returnOrderResult.map(item => {
        if (item.id === id) {
          this.returnOrderDialog1.reason = id ? item.name : ''
        }
      })
    },
    //门店订单确认退货
    async showDoorShopOrderReturnConfirm(){
      let returnGoods = []
      let money = 0.0
      for(let i = 0; i < this.returnOrderDialog1.multipleSelection.length; i++) {
        if (!(/^[0-9]*[1-9][0-9]*$/.test(this.returnOrderDialog1.multipleSelection[i].my_return_num)) || (this.returnOrderDialog1.multipleSelection[i].my_return_num > this.returnOrderDialog1.multipleSelection[i].refund_num)) {
          this.$message.closeAll()
          this.$message({
            message: `【${this.returnOrderDialog1.multipleSelection[i].subtitle}】商品的退货数量有误！`,
            type: 'error'
          })
          return
        }
        if (!(/^\d+(\.\d+)?$/.test(this.returnOrderDialog1.multipleSelection[i].my_return_price)) || (this.returnOrderDialog1.multipleSelection[i].my_return_price > this.returnOrderDialog1.multipleSelection[i].refund_price)) {
          this.$message.closeAll()
          this.$message({
            message: `【${this.returnOrderDialog1.multipleSelection[i].subtitle}】商品的退货单价有误！`,
            type: 'error'
          })
          return
        }
        let obj = {
          refund_id:this.returnOrderDialog1.multipleSelection[i].s_id,
          refund_price:this.returnOrderDialog1.multipleSelection[i].my_return_price,
          refund_num:this.returnOrderDialog1.multipleSelection[i].my_return_num,
          is_service_goods:this.returnOrderDialog1.multipleSelection[i].is_service_goods,
        }
        money += parseFloat(this.returnOrderDialog1.multipleSelection[i].my_return_price) * parseFloat(this.returnOrderDialog1.multipleSelection[i].my_return_num)
        returnGoods.push(obj)
      }

      let requestData = {
        order_id: this.returnOrderDialog1.id,
        remarks: this.returnOrderDialog1.remarks,
        reason: this.returnOrderDialog1.reason,
        data: returnGoods,
        money: money,
        type: this.returnOrderDialog1.type,
      }

      if(!requestData.data.length) {
        this.$message.closeAll()
        this.$message({
          message: `请选择要退货的商品`,
          type: 'error'
        })
        return
      }
      if (!requestData.type){
        this.$message.closeAll()
        this.$message({
          message: `请选择退款方式`,
          type: 'error'
        })
        return
      }

      if(!requestData.reason) {
        this.$message.closeAll()
        this.$message({
          message: `请选填退货原因`,
          type: 'error'
        })
        return
      }

      await postOrderReturnConfirm(requestData).then(res => {
        this.returnOrderDialog1.isShow = false
        if (res.code === '200') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          setTimeout(()=>{this.getOrdersList()},1000)
        }
      })
      this.returnOrderDialog1.remarks = ''
      this.returnOrderDialog1.reason = ''
      this.returnOrderDialog1.reason_id = ''

    },


    //服务卡订单列表
    async getServiceCardOrderList () {
      let requestData = {
        pay_way:this.requestData.pay_way,
        waiter_id:this.requestData.waiter_id,
        status:this.requestData.status,
        start_time:this.requestData.date.length ? this.requestData.date[0] : this.requestData.startTime,
        end_time:this.requestData.date.length ? this.requestData.date[1] : this.requestData.endTime,
        search:this.requestData.search,
        page:this.requestData.page,
        limit:this.requestData.limit,
      }
      postServiceCardOrderList(requestData).then(res => {
        this.responseData2.count = res.count
        this.responseData2.data = res.data.length ? res.data : []
      })
    },
    //服务卡退单弹框展示
    async showServiceCardDialog (id) {
      this.returnOrderDialog2.requestData.id = id
      await postReturnServiceCardOrder({id}).then(res =>{
        if (res.code === '200') {
          this.returnOrderDialog2.responseData = res.data
        }
      })
      this.returnOrderDialog2.isShow = true
    },
    //服务卡确认退款
    async serviceCardReturn () {
      let requestData = {
        id: this.returnOrderDialog2.requestData.id,
        type: this.returnOrderDialog2.requestData.type,
        reason: this.returnOrderDialog2.requestData.reason,
        remarks: this.returnOrderDialog2.requestData.remarks,
      }
      if (!requestData.type || !requestData.reason) {
        this.$message.closeAll()
        this.$message({
          message: '请把申请退单的参数输入完整',
          type: 'error'
        })
        return
      }
      await postReturnServiceCardOrderConfirm(requestData).then(res =>{
        if (res.code === '200') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          setTimeout(()=>{this.getOrdersList()}, 1000)
        }
      })
      this.returnOrderDialog2.requestData.id = ''
      this.returnOrderDialog2.requestData.type = ''
      this.returnOrderDialog2.requestData.reason = ''
      this.returnOrderDialog2.requestData.remarks = ''
      this.returnOrderDialog2.isShow = false
    },
    //服务卡退货原因切换
    serviceCardReturnResultChange(id){
      this.returnOrderDialog2.returnOrderResult.map(item => {
        if (item.id === id) {
          this.returnOrderDialog2.requestData.reason = id ? item.name : ''
        }
      })
    },
    //服务卡退单详情
    async showServiceCardReturnDetailDialog(id) {
      await postServiceCardReturnDetail({id}).then(res => {
        if (res.code === '200') {
          this.returnDetailDialog2.responseData = res.data
          this.returnDetailDialog2.isShow = true
        }
      })
    },
  },
  mounted () {
    this.getOrderList()
    this.getWaiterList()
  }
}
</script>

<style lang="less" scoped>
.order-manage-page{
  .el-tabs{
    el-tabs__header{
      .el-tabs__item{
        width:109px!important;
        height:27px!important;
        font-size:28px!important;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(46,202,241,1)!important;
      }
    }
    .el-tabs__content{
      .search-condition{
        /*border: 1px solid red;*/
        display: flex;
        justify-content: flex-start;
        flex-direction:row;
        flex-wrap: nowrap;
        .select{
          width:188px;
          margin-right: 16px;
          .el-input__inner{
            border:1px solid red;
            height: 48px !important;
          }
          button{
            /*height:48px;*/
            /*border:1px solid red;*/
          }
        }
      }
      .search-btns{
        margin-top: 36px;
        margin-bottom: 36px;
        display: flex;
        justify-content: flex-start;
        flex-direction:row;
        flex-wrap: nowrap;
        .span{
          color: #1A1A1A;
          line-height: 40px;
          height:40px;
          margin-right: 32px;
        }
        .btn{
          color: #1A1A1A;
          width:108px;
          height:40px;
          background: #F5F5F5;
          border-radius:4px;
          margin-right: 32px;
          margin-left: 0;
        }
        .active{
          color: #fff;
          background:rgba(107,210,244,1);
        }
      }

      .footer{
        margin-top: 20px;
        text-align: right;
      }
    }
  }
  /* 订单详情弹框 */
  .order-details-dialog{
    .title{
      height:21px;
      width: 100%;
      /*font-size:22px;*/
      font-family:SourceHanSansCN-Regular;
      font-weight:400;
      color:rgba(26,26,26,1);
      margin-bottom: 15px;
      margin-top: 27px;
    }
    .content{
      color: #808080;
      width: 100%;
      height:18px;
      margin-bottom: 15px;
      font-weight:400;
      color:rgba(128,128,128,1);
    }
  }
  /* 会员详情弹框*/
  .order-manage-page-member-info{

  }
  .demo-form-inline{
    display: flex;
    justify-content: space-between;
    .el-form-item{
      &:last-child{
        margin-right: 0;
      }
    }
  }
}
</style>
