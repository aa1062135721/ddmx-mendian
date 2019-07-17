<template>
    <div class="order-manage-page">
      <el-tabs v-model="requestData.type" @tab-click="handleClick">
        <el-tab-pane label="商品订单" name="1">
          <div class="search-condition">
            <div class="select">
              <el-select v-model="requestData.nowWaiter.name" clearable placeholder="选择服务人员" >
                <el-option
                  v-for="item in waiter"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select v-model="requestData.payWay.name" clearable placeholder="选中支付方式">
                <el-option
                  v-for="item in payWayList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width: 148px;">
              <el-select v-model="requestData.orderStatus.name" clearable placeholder="选择状态">
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
              <el-button plain>搜索</el-button>
            </div>
          </div>
          <div class="search-btns">
            <span class="span">筛选</span>
            <el-button class="btn active">今日</el-button>
            <el-button class="btn">昨日</el-button>
            <el-button class="btn">本周</el-button>
            <el-button class="btn">自定义</el-button>
          </div>
          <div class="serch-table">
            <el-table :data="orderList" border style="width: 100%;" height="565">
              <el-table-column prop="id" label="订单号"></el-table-column>
              <el-table-column label="会员账号">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getMemberInfo(scope.row.member_id)">{{scope.row.mobile}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="付款金额"></el-table-column>
              <el-table-column prop="good_price" label="商品成本"></el-table-column>
              <el-table-column prop="is_out_good" label="是否外包商品"></el-table-column>
              <el-table-column prop="pay_way" label="付款方式"></el-table-column>
              <el-table-column prop="time" label="交易时间"></el-table-column>
              <el-table-column label="服务人员">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="getWaiterInfo(scope.row.waiter_id)">{{scope.row.waiter}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="is_setting_goods_price" label="设置商品成本">
                <template slot-scope="scope">
                  <el-button size="mini" @click="settingOutGoodPriceDialog.isShow = true">设置</el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="orderDetailsDialog.isShow = true">订单详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务订单" name="2">
          服务订单
        </el-tab-pane>
        <el-tab-pane label="充值订单" name="3">
          充值订单
        </el-tab-pane>
      </el-tabs>

      <!-- 订单详情弹框-->
      <el-dialog class="order-details-dialog" title="订单详情" :visible.sync="orderDetailsDialog.isShow" width="968px" :center="true">
        <div>
          <div>
            <div class="title">订单信息</div>
            <div class="content clear-both">
                <div class="float-left">交易时间：2015-11-26 15:22:10</div>
                <div class="float-right">交易门店：留云路门店12</div>
            </div>
          </div>
          <div>
            <div class="title">收款信息</div>
            <div class="content clear-both">
              <div class="float-left">应收金额：100元</div>
              <div class="float-right">实收金额：100元</div>
            </div>
            <div class="content clear-both">
              <div class="float-left">收款方式：现金收款</div>
            </div>
          </div>
          <div>
            <div class="title">会员信息</div>
            <div class="content clear-both">
              <div class="float-left">会员账号：12121212121</div>
              <div class="float-right">会员昵称：张三</div>
            </div>
            <div class="content clear-both">
              <div class="float-left">会员等级：普通会员</div>
              <div class="float-right">会员余额：90元</div>
            </div>
          </div>
          <div>
            <div class="title">商品信息</div>
            <div>
              <el-table :data="orderList" border style="width: 100%;" height="142">
                <el-table-column prop="id" label="订单号" width="180"></el-table-column>
                <el-table-column prop="mobile" label="会员账号" width="180"></el-table-column>
                <el-table-column prop="price" label="付款金额"></el-table-column>
                <el-table-column prop="mobile" label="会员账号" width="180"></el-table-column>
                <el-table-column prop="price" label="付款金额"></el-table-column>
              </el-table>
            </div>
          </div>
          <div>
            <div class="title">退单信息</div>
            <div>
              <el-table :data="orderList" border style="width: 100%;" height="142">
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
          <el-table :data="orderList" border style="width: 100%;" height="142">
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
    </div>
</template>

<script>
import { postOrderList, postWaiter, postOrderWaiter, postMemberInfo, } from '../../api/getData'
export default {
  name: 'OrderManage', // 订单管理
  data () {
    return {
      requestData: {
        // 当前选中的服务人员
        nowWaiter: {
          id: -1, // 服务员id  当服务员的id为0师表示为当前登录的店长
          name: '请选择服务员', // 服务员名称
          type: '未知' // 服务类型
        },
        //当前选中的支付方式
        payWay:{id: 1, name: '微信'},
        // 选择订单状态
        orderStatus:{id:1,name:'正常'},
        //请输入需查询的会员手机号/订单号
        mobile: '',
        //门店id
        shop_code: 18,
        //订单类型 1=商品订单，2=服务卡订单 3=充值购卡 4=收银台收银
        type: '1',
      },
      // 订单
      orderList: [
        {id: 1, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 2, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 3, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 4, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 5, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 6, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 7, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 8, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 9, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 10, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 11, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 12, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 13, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 14, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 15, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 16, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1},
        {id: 17, mobile: '15213710631', price: 15.50, good_price: 10, is_out_good: '是', pay_way: '支付宝', time: '2019-12-05 15:30:29', waiter: '张三', status: '正常', is_setting_goods_price: 1}
      ],
      // 订单详情弹窗内容
      orderDetailsDialog: {
        isShow: false
      },
      // 选择服务人员
      waiter: [
        {
          id: 1, // 服务员id  当服务员的id为0师表示为当前登录的店长
          name: '管理员', // 服务员名称
          type: '店长' // 服务类型
        },
        {
          id: 2, // 服务员id  当服务员的id为0师表示为当前登录的店长
          name: '张三', // 服务员名称
          type: '店长' // 服务类型
        }
      ],
      // 选择订单状态
      orderStatus:[
        {id:1,name:'正常'},
        {id:2,name:'退单'},
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
    //tab切换
    handleClick (tab, event) {
      console.log(tab, event)
      this.getOrderList()
    },

    // 获取服务员列表
    getWaiterList () {
      postWaiter().then(res => {
        if (res.data.length) {
          this.waiter = res.data
        }
      }).cache(err => {
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
    getWaiterInfo(id = 11){
      this.waiterInfoDialog.isShow = true
      let data = {
        id:id
      }
      postOrderWaiter(data).then(res=>{
        this.waiterInfoDialog.waiterInfo = res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取订单列表
    getOrderList(){
      postOrderList(this.requestData).then(res=>{
        if (res.data){
          this.orderList = res.data
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
