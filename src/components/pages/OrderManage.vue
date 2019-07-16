<template>
    <div class="order-manage-page">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="商品订单" name="first">
          <div class="search-condition">
            <div class="select">
              <el-select v-model="nowWaiter.id" clearable placeholder="选择服务人员">
                <el-option
                  v-for="item in waiter"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select v-model="value" clearable placeholder="选择服务项目">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select">
              <el-select v-model="value" clearable placeholder="选择支付方式">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width: 148px;">
              <el-select v-model="value" clearable placeholder="选择状态">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="select" style="width:368px;height:48px;">
              <el-input
                placeholder="请输入需查询的会员手机号/订单号"
                v-model="input"
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
            <el-table :data="goodsOrderList" border style="width: 100%;" height="565">
              <el-table-column prop="id" label="订单号" width="180"></el-table-column>
              <el-table-column prop="mobile" label="会员账号" width="180"></el-table-column>
              <el-table-column prop="price" label="付款金额"></el-table-column>
              <el-table-column prop="good_price" label="商品成本"></el-table-column>
              <el-table-column prop="is_out_good" label="是否外包商品"></el-table-column>
              <el-table-column prop="pay_way" label="付款方式"></el-table-column>
              <el-table-column prop="time" label="交易时间"></el-table-column>
              <el-table-column prop="waiter" label="服务人员"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="is_setting_goods_price" label="设置商品成本"></el-table-column>
              <el-table-column label="操作">
                <el-button size="mini" @click="orderDetailsDialog.isShow = true">订单详情</el-button>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务订单" name="second">服务订单</el-tab-pane>
        <el-tab-pane label="充值订单" name="third">充值订单</el-tab-pane>
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
              <el-table :data="goodsOrderList" border style="width: 100%;" height="142">
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
              <el-table :data="goodsOrderList" border style="width: 100%;" height="142">
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
    </div>
</template>

<script>
export default {
  name: 'OrderManage',
  data () {
    return {
      activeName: 'first',
      options: [{value: '选项1', label: '黄金糕'}, {value: '选项2', label: '双皮奶'}, {value: '选项3', label: '蚵仔煎'}, {value: '选项4', label: '龙须面'}, {value: '选项5', label: '北京烤鸭'}],
      value: '',
      // 商品订单
      goodsOrderList: [
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
      // 当前选中的服务人员
      nowWaiter: {
        id: -1, // 服务员id  当服务员的id为0师表示为当前登录的店长
        name: '请选择服务员', // 服务员名称
        type: '未知' // 服务类型
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
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
        border: 1px solid red;
        display: flex;
        justify-content: flex-start;
        flex-direction:row;
        flex-wrap: nowrap;
        .select{
          width:188px;
          margin-right: 16px;
          input{
            border:1px solid rgba(210,210,210,1);
            height: 48px !important;
          }
          button{
            height:48px;
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
}
</style>
