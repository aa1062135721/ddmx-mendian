<template>
    <div class="order-manage-page">
      <el-tabs v-model="requestData.type" @tab-click="handleClick">
        <el-tab-pane label="商品订单" name="1">
          <div class="search-condition">
            <div class="select">
              <el-select v-model="requestData.nowWaiter" clearable placeholder="选择服务人员" >
                <el-option
                  v-for="item in waiter"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select v-model="requestData.payWay" clearable placeholder="选中支付方式">
                <el-option
                  v-for="item in payWayList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width: 148px;">
              <el-select v-model="requestData.orderStatus" clearable placeholder="选择状态">
                <el-option
                  v-for="item in orderStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width: 148px;">
              <el-select v-model="requestData.goodType" clearable placeholder="选择商品类型">
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
                v-model="requestData.mobile"
                placeholder="请输入需查询的会员手机号/订单号"
                clearable>
              </el-input>
            </div>
            <div class="select">
              <el-button plain @click="getOrderList">搜索</el-button>
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
          </div>
          <div class="serch-table">
            <el-table :data="responseData1.data" border style="width: 100%;" height="565">
              <el-table-column prop="sn" label="订单号"></el-table-column>
              <el-table-column label="会员账号">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getMemberInfo(scope.row.member_id)">{{scope.row.mobile}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="付款金额"></el-table-column>
              <el-table-column label="商品成本">
                <template slot-scope="scope">
                  {{scope.row.is_outsourcing_goods === 1 ?  scope.row.old_amount :  '无'}}
                </template>
              </el-table-column>
              <el-table-column label="是否外包商品">
                <template slot-scope="scope">
                  {{scope.row.is_outsourcing_goods === 1 ? '是' :  '否'}}
                </template>
              </el-table-column>
              <el-table-column prop="pay_way" label="付款方式"></el-table-column>
              <el-table-column prop="time" label="交易时间"></el-table-column>
              <el-table-column label="服务人员">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getWaiterInfo(scope.row.waiter_id)">{{scope.row.waiter}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="order_list_status" label="状态"></el-table-column>
              <el-table-column prop="is_setting_goods_price" label="设置商品成本">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" v-if="scope.row.is_outsourcing_goods === 1" @click="settingOutGoodPriceDialog.isShow = true">设置</el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="showOrderDetails(requestData.type, scope.row.id)">订单详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="pageSizeChange"
              :page-sizes="[1,10, 20, 30, 40]"
              :page-size="requestData.limit"
              @current-change="responseDataOnePageCurrentChange"
              :current-page.sync="requestData.page"
              :total="responseData1.count">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务订单" name="2">
          <div class="search-condition">
            <div class="select">
              <el-select v-model="requestData.nowWaiter" clearable placeholder="选择服务人员" >
                <el-option
                  v-for="item in waiter"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select v-model="requestData.service" clearable placeholder="选择服务项目">
                <el-option
                  v-for="item in serviceList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select v-model="requestData.payWay" clearable placeholder="选中支付方式">
                <el-option
                  v-for="item in payWayList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width: 148px;">
              <el-select v-model="requestData.orderStatus" clearable placeholder="选择状态">
                <el-option
                  v-for="item in orderStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width:368px;height:48px;">
              <el-input
                v-model="requestData.mobile"
                placeholder="请输入需查询的会员手机号/订单号"
                clearable>
              </el-input>
            </div>
            <div class="select">
              <el-button plain @click="getOrderList">搜索</el-button>
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
          </div>
          <div class="serch-table">
            <el-table :data="responseData2.data" border style="width: 100%;" height="565">
              <el-table-column prop="sn" label="订单号"></el-table-column>
              <el-table-column label="会员账号">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getMemberInfo(scope.row.member_id)">{{scope.row.mobile}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="付款金额"></el-table-column>
              <el-table-column prop="pay_way" label="付款方式"></el-table-column>
              <el-table-column label="服务成本">
                <template slot-scope="scope">
                  {{scope.row.is_outsourcing_goods === 1 ?  scope.row.old_amount :  '无'}}
                </template>
              </el-table-column>
              <el-table-column label="是否外包服务">
                <template slot-scope="scope">
                  {{scope.row.is_outsourcing_goods === 1 ? '是' :  '否'}}
                </template>
              </el-table-column>
              <el-table-column prop="time" label="交易时间"></el-table-column>
              <el-table-column label="服务人员">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getWaiterInfo(scope.row.waiter_id)">{{scope.row.waiter}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="order_list_status" label="状态"></el-table-column>
              <el-table-column prop="is_setting_goods_price" label="设置服务成本">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" v-if="scope.row.is_outsourcing_goods === 1"  @click="settingOutGoodPriceDialog.isShow = true">设置</el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini">订单详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="pageSizeChange"
              :page-sizes="[1,10, 20, 30, 40]"
              :page-size="requestData.limit"
              @current-change="responseDataOnePageCurrentChange"
              :current-page.sync="requestData.page"
              :total="responseData2.count">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="充值订单" name="3">
          <div class="search-condition">
            <div class="select">
              <el-select v-model="requestData.nowWaiter" clearable placeholder="选择服务人员" >
                <el-option
                  v-for="item in waiter"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select v-model="requestData.payWay" clearable placeholder="选中支付方式">
                <el-option
                  v-for="item in payWayList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width: 148px;">
              <el-select v-model="requestData.orderStatus" clearable placeholder="选择状态">
                <el-option
                  v-for="item in orderStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width:368px;height:48px;">
              <el-input
                v-model="requestData.mobile"
                placeholder="请输入需查询的会员手机号/订单号"
                clearable>
              </el-input>
            </div>
            <div class="select">
              <el-button plain @click="getOrderList">搜索</el-button>
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
          </div>
          <div class="serch-table">
            <el-table :data="responseData3.data" border style="width: 100%;" height="565">
              <el-table-column prop="sn" label="订单号"></el-table-column>
              <el-table-column label="会员账号">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getMemberInfo(scope.row.member_id)">{{scope.row.mobile}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="old_amount" label="充值金额"></el-table-column>
              <el-table-column prop="pay_way" label="付款方式"></el-table-column>
              <el-table-column prop="time" label="交易时间"></el-table-column>
              <el-table-column label="服务人员">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getWaiterInfo(scope.row.waiter_id)">{{scope.row.waiter}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="remake" label="备注"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini">订单详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="pageSizeChange"
              :page-sizes="[1,10, 20, 30, 40]"
              :page-size="requestData.limit"
              @current-change="responseDataOnePageCurrentChange"
              :current-page.sync="requestData.page"
              :total="responseData3.count">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 商品订单--订单详情弹框-->
      <el-dialog class="order-details-dialog" title="订单详情" :visible.sync="orderDetailsDialog1.isShow" width="968px" :center="true">
        <div>
          <div>
            <div class="title">订单信息</div>
            <div class="content clear-both">
                <div class="float-left">交易时间：{{orderDetailsDialog1.time}}</div>
                <div class="float-right">交易门店：{{orderDetailsDialog1.is_online}}</div>
            </div>
          </div>
          <div>
            <div class="title">收款信息</div>
            <div class="content clear-both">
              <div class="float-left">应收金额：{{orderDetailsDialog1.old_amount}}</div>
              <div class="float-right">实收金额：{{orderDetailsDialog1.amount}}</div>
            </div>
            <div class="content clear-both">
              <div class="float-left">收款方式：{{orderDetailsDialog1.pay_way}}</div>
            </div>
          </div>
          <div>
            <div class="title">会员信息</div>
            <div class="content clear-both">
              <div class="float-left">会员账号：{{orderDetailsDialog1.member.mobile || ''}}</div>
              <div class="float-right">会员昵称：{{orderDetailsDialog1.member.nickname || ''}}</div>
            </div>
            <div class="content clear-both">
              <div class="float-left">会员等级：{{orderDetailsDialog1.member.level || ''}}</div>
              <div class="float-right">会员余额：{{orderDetailsDialog1.member.money || ''}}</div>
            </div>
          </div>
          <div>
            <div class="title">商品信息</div>
            <div>
              <el-table :data="orderDetailsDialog1.goods" border style="width: 100%;" height="142">
                <el-table-column prop="subtitle" label="商品名称" width="180"></el-table-column>
                <el-table-column prop="num" label="数量" width="180"></el-table-column>
                <el-table-column prop="real_price" label="成本价"></el-table-column>
                <el-table-column prop="price" label="单价" width="180"></el-table-column>
                <el-table-column prop="pay_all_price" label="付款价格"></el-table-column>
              </el-table>
            </div>
          </div>
          <div>
            <div class="title">退单信息</div>
            <div>
              <el-table  border style="width: 100%;" height="142">
                <el-table-column prop="id" label="订单号" width="180"></el-table-column>
                <el-table-column prop="mobile" label="会员账号" width="180"></el-table-column>
                <el-table-column prop="price" label="付款金额"></el-table-column>
                <el-table-column prop="id" label="订单号" width="180"></el-table-column>
                <el-table-column prop="mobile" label="会员账号" width="180"></el-table-column>
                <el-table-column prop="price" label="付款金额"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-dialog>
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
      <!-- 外包商品成本设置-->
      <el-dialog class="order-manage-page-member-info" title="外包商品成本设置" :visible.sync="settingOutGoodPriceDialog.isShow" width="550px" :center="true">
        <div>
          <el-table  border style="width: 100%;" height="142">
            <el-table-column prop="id" label="订单号"></el-table-column>
            <el-table-column prop="mobile" label="商品名称"></el-table-column>
            <el-table-column prop="price" label="交易金额"></el-table-column>
            <el-table-column  label="设置成本">
              <el-input placeholder="请输入商品成本"></el-input>
            </el-table-column>
          </el-table>
          <div style="text-align: center;margin-top: 15px;">
            <el-button class="my-secondary-btn">取消</el-button>
            <el-button class="my-primary-btn">确定</el-button>
          </div>
        </div>
      </el-dialog>

      <!-- 商品订单--退款处理-->
      <el-dialog class="order-details-dialog" title="退款处理" :visible.sync="returnOrderDialog1.isShow" width="968px" :center="true">
        <div>
          <div>
            <div class="float-left">
              <el-select v-model="requestData.nowWaiter" clearable placeholder="选择退货原因" >
                <el-option
                  v-for="item in returnOrderResult"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-input
                placeholder="请输入其他原因"
                clearable>
              </el-input>
            </div>
          </div>
          <div>
            <el-table :data="orderDetailsDialog1.goods" border style="width: 100%;" height="142">
              <el-table-column prop="subtitle" label="商品名称" width="180"></el-table-column>
              <el-table-column prop="num" label="数量" width="180"></el-table-column>
              <el-table-column prop="real_price" label="成本价"></el-table-column>
              <el-table-column prop="price" label="单价" width="180"></el-table-column>
              <el-table-column prop="pay_all_price" label="付款价格"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { postOrderList, postWaiter, postOrderWaiter, postMemberInfo, postOrderDetails, postOrderDetailsGoods } from '../../api/getData'
import { changeTime,getWeekStartDateAndEndDateRange } from '../../utils'

export default {
  name: 'OrderManage', // 订单管理
  data () {
    return {
      // 退货原因列表
      returnOrderResult:[
        {id:1,name:'你这个东西太贵了。'},
        {id:2,name:'你这个东西是打发点死大多数大饭店太贵了。'},
        {id:3,name:'说是。'},
        {id:4,name:'你这个东西太事实上贵了。'},
        {id:5,name:'其他原因。'},
      ],
      requestData: {
        //服务项目
        service: '',
        // 分页
        page: 1,
        // 每页的条数
        limit: 1,
        // 当前选中的服务人员
        nowWaiter: '',
        //当前选中的支付方式
        payWay: '',
        // 选择订单状态
        orderStatus: '',
        //
        goodType: 1,
        //请输入需查询的会员手机号/订单号
        mobile: '',
        //门店id
        shop_code: 18,
        //订单类型 1=商品订单，2=服务卡订单 3=充值购卡 4=收银台收银
        type: '1',
        // 筛选时间 自定义时间
        date:[
        ],
        // 当前选择的时间// 1=今日，2=昨日，3=本周 0=未选择
        timeBtnValue: 0,
        startTime: '', //开始时间
        endTime:'', //结束时间
      },
      //商品订单
      responseData1:{

      },
      //服务订单
      responseData2:{

      },
      //充值订单
      responseData3:{

      },
      // 商品订单-退单弹框
      returnOrderDialog1:{
        isShow: false
      },
      // 商品订单-订单详情弹窗内容
      orderDetailsDialog1: {
        isShow: false,
        id: 2,
        sn: "XM155937958663",
        time: "2019-06-02 18:49:46",
        shop_code: "总店",
        is_online: "门店收银",
        waiter: "测试员工2",
        old_amount: "136.00",
        amount: "130.00",
        member: {
          mobile: "17723582121",
          nickname: "罗文2222",
          level: "普通会员",
          money: "29.01"
        },
        goods: [
          {
            id: 1,    //订单商品表的id
            subtitle: "新西兰S-26惠氏婴幼儿奶粉2段900g/罐",       //商品购买时的商品名称
            num: 2,   //数量
            refund: 0,    //退货数量
            price: "179.00",  //原价
            real_price: "179.00", //实际
            pay_all_price: 358    //付款总数
          },
          {
            id: 2,
            subtitle: "安琪憨贝洁婴儿柔湿巾80片1包装",
            num: 2,
            refund: 2,
            price: "151.00",
            real_price: "151.00",
            pay_all_price: 302
          }
        ],
        pay_way: "现金支付"
      },
      // 选择服务人员
      waiter: [
        // {
        //   id: 1, // 服务员id  当服务员的id为0师表示为当前登录的店长
        //   name: '管理员', // 服务员名称
        //   type: '店长' // 服务类型
        // },
      ],
      //选择服务项目
      serviceList:[
        {id:1,name:'水育'}
      ],
      // 选择订单状态
      orderStatus:[
        {id:1,name:'正常'},
        {id:2,name:'退单'},
      ],
      // 商品类型
      goodsType:[
        {id:1, name: '全部'},
        {id:2, name: '外包商品'},
        {id:3, name: '公司商品'},
      ],
      //选择支付方式：1=微信支付 2=支付宝 3=余额(会员卡)4=银行卡5=现金6=美团7=赠送8=门店自用 9=兑换10=包月服务11=定制疗程99=管理员充值-->
      payWayList:[
        {id: 1, name: '微信'},
        {id: 2, name: '支付宝'},
        {id: 3, name: '余额(会员卡)'},
        {id: 4, name: '银行卡'},
        {id: 5, name: '现金'},
        {id: 6, name: '美团'},
        {id: 7, name: '赠送'},
        {id: 8, name: '门店自用'},
        {id: 9, name: '兑换'},
        {id: 10, name: '包月服务'},
        {id: 11, name: '定制疗程'},
        {id: 99, name: '管理员充值'},
      ],
      // 会员信息弹框
      memberInfoDialog: {
        isShow: false,
        memberInfo:{
          nickname: "涵涵妈",
          mobile: "18725928054",
          shop_code: "两江时光店",
          level: "普通会员",
          addtime: "2017-08-15 12:52:04"
        }
      },
      // 服务人员信息弹框
      waiterInfoDialog: {
        isShow: false,
        waiterInfo:{
          name: "测试员工",
          mobile: "15223622442",
          shop: "测试门店10",
          type: "水育,大保健,艾灸",
          addtime: "2018-11-02 09:32:27"
        }
      },
      // 设置商品成本弹框
      settingOutGoodPriceDialog: {
        isShow: false,
      }
    }
  },
  methods: {
    //查看订单详情
    async showOrderDetails(type, id){
      let data = {
        type,
        id
      }
      await postOrderDetails(data).then(res => {
        if (res.code === '200') {
          // this.orderDetailsDialog = res.data
          this.orderDetailsDialog1.isShow = true
        }
      }).catch(err => {
        console.log(err)
      })

      let data2 = {
        order_id:id,
        type:type,
      }
      await postOrderDetailsGoods(data2).then(res=>{
        if (res.code === '200') {
          this.orderDetailsDialog1.goodList = res.data
        }
      })
    },
    //商品订单 页码操作
    responseDataOnePageCurrentChange(val){
      this.requestData.page = val
      this.getOrderList()
    },
    pageSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.requestData.limit = val
      this.getOrderList()
    },
    // 1=今日，2=昨日，3=本周
    chooseTime(type) {
      this.requestData.timeBtnValue = type
      switch (type) {
        case 1:
          this.requestData.startTime = changeTime(new Date().getTime())
          this.requestData.endTime = changeTime(new Date().getTime())
          this.requestData.date = []
          break;
        case 2:
          this.requestData.startTime = changeTime(new Date().getTime() -  24 * 60 * 60 * 1000)
          this.requestData.endTime = changeTime(new Date().getTime() -  24 * 60 * 60 * 1000)
          this.requestData.date = []
          break;
        case 3:
          let date = getWeekStartDateAndEndDateRange()
          this.requestData.startTime = date[0]
          this.requestData.endTime = date[1]
          this.requestData.date = []
          break;
      }
    },
    // 自定义时间
    chooseTimeDIY(){
      this.requestData.startTime = ''
      this.requestData.endTime = ''
      this.requestData.timeBtnValue = 0
    },

    //tab切换
    handleClick (tab, event) {
      console.log(tab, event)
      this.requestData.page = 1
      this.getOrderList()
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
    //获取会员信息
    getMemberInfo(id = 1){
      this.memberInfoDialog.isShow = true
      let data = {
        id:id
      }
      postMemberInfo(data).then(res=>{
        this.memberInfoDialog.memberInfo = res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取单个服务员信息
    async getWaiterInfo(id){
      await postOrderWaiter({id: id}).then(res=>{
        this.waiterInfoDialog.waiterInfo = res.data
        this.waiterInfoDialog.isShow = true
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取订单列表
    getOrderList(){
      let data = {
        type: this.requestData.type,// 订单类型 1 商品订单  2 服务订单 3:充值购卡 4:收银台收款 5:购买卷卡（服务劵，服务卡...） 6:兑换券 默认为1
        page: this.requestData.page,
        limit: this.requestData.limit,
      }
      console.log('请求数据',this.requestData)
      postOrderList(data).then(res=>{
        console.log('订单列表', res)
        if (res.code === '200') {
          if (res.data){
            switch (this.requestData.type) {
              case "1":
                this.responseData1 = res
                break
              case "2":
                this.responseData2 = res
                break
              case "3":
                this.responseData3 = res
                break

            }
          }
        }
      }).catch(err=>{
        console.log(err)
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
      font-size:22px;
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
      font-size:18px;
      font-family:SourceHanSansCN-Regular;
      font-weight:400;
      color:rgba(128,128,128,1);
    }
  }
  /* 会员详情弹框*/
  .order-manage-page-member-info{

  }
}
</style>
