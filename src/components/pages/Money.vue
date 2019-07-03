<template>
    <div class="bg">
      <v-head></v-head>
      <div style="padding: 10px 20px;">
        <el-row :gutter="20">
          <el-col :span="14">
            <div class="grid-content all-goods">
              <div class="goods-type">
                <el-button class="fuwu-fenlei-button">服务项目</el-button>
                <el-button class="page-fenlei-button" icon="el-icon-arrow-left"></el-button>
                <el-button class="fenlei-button" type="primary">宝马用品</el-button>
                <el-button class="fenlei-button" type="primary">服装服饰</el-button>
                <el-button class="fenlei-button" type="primary">奶瓶</el-button>
                <el-button class="fenlei-button" type="primary">尿不湿</el-button>
                <el-button class="fenlei-button" type="primary">奶瓶</el-button>
                <el-button class="page-fenlei-button" icon="el-icon-arrow-right"></el-button>
              </div>
              <div class="flex-goods">
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                  <v-good class="goods"></v-good>
                </div>
                <div class="page-buttons">
                <button class="page-button">上一页</button>
                <button class="page-button">下一页</button>
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content caozuo-buttons">
              <el-button class="caozuo-button" type="primary" style="font-size: 45px;">&nbsp;&nbsp;+&nbsp;&nbsp;</el-button>
              <br><br>
              <el-button class="caozuo-button" type="primary">&nbsp;&nbsp;-&nbsp;&nbsp;</el-button>
              <br><br>
              <el-button @click="xiugaishuliang = true" class="caozuo-button" type="primary">数量</el-button>
              <br><br>
              <el-button @click="xiugaijiage = true" class="caozuo-button" type="primary">改价</el-button>
              <br><br>
              <el-button class="caozuo-button" type="primary">删除</el-button>
              <br><br>
              <el-button @click="chongzhi = true" class="caozuo-button" type="primary">充值</el-button>
              <br><br>
              <el-button class="caozuo-button" type="primary">会员</el-button>
              <br><br>
              <el-button class="caozuo-button" type="primary">购卡</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple jiesuan-goods" >
              <div class="search">
                <el-input class="goods-search" placeholder="商品名称/条形码" suffix-icon="el-icon-search"></el-input>
              </div>
              <div class="pay-goods-box">
                <ul>
                  <li class="title clear-both">
                    <span class="float-left">衡欣牌新姿态粉 原蛋白益生菌</span>
                    <span class="float-right">数量 1</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left">1234567890123431373</span>
                    <span class="float-right red">￥300.00</span>
                  </li>
                  <li class="title">
                    <span class="red danjia">￥300.00</span>
                    <span class="yuanjia">原价￥600.00</span>
                    <span class="huiyuanjia">会员价￥216.50</span>
                  </li>
                </ul>
                <ul>
                  <li class="title clear-both">
                    <span class="float-left">衡欣牌新姿态粉 原蛋白益生菌</span>
                    <span class="float-right">数量 1</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left">1234567890123431373</span>
                    <span class="float-right red">￥300.00</span>
                  </li>
                  <li class="title">
                    <span class="red danjia">￥300.00</span>
                    <span class="yuanjia">原价￥600.00</span>
                    <span class="huiyuanjia">会员价￥216.50</span>
                  </li>
                </ul>
                <ul>
                  <li class="title clear-both">
                    <span class="float-left">衡欣牌新姿态粉 原蛋白益生菌</span>
                    <span class="float-right">数量 1</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left">1234567890123431373</span>
                    <span class="float-right red">￥300.00</span>
                  </li>
                  <li class="title">
                    <span class="red danjia">￥300.00</span>
                    <span class="yuanjia">原价￥600.00</span>
                    <span class="huiyuanjia">会员价￥216.50</span>
                  </li>
                </ul>
                <ul>
                  <li class="title clear-both">
                    <span class="float-left">衡欣牌新姿态粉 原蛋白益生菌</span>
                    <span class="float-right">数量 1</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left">1234567890123431373</span>
                    <span class="float-right red">￥300.00</span>
                  </li>
                  <li class="title">
                    <span class="red danjia">￥300.00</span>
                    <span class="yuanjia">原价￥600.00</span>
                    <span class="huiyuanjia">会员价￥216.50</span>
                  </li>
                </ul>
                <ul>
                  <li class="title clear-both">
                    <span class="float-left">衡欣牌新姿态粉 原蛋白益生菌</span>
                    <span class="float-right">数量 1</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left">1234567890123431373</span>
                    <span class="float-right red">￥300.00</span>
                  </li>
                  <li class="title">
                    <span class="red danjia">￥300.00</span>
                    <span class="yuanjia">原价￥600.00</span>
                    <span class="huiyuanjia">会员价￥216.50</span>
                  </li>
                </ul>
                <ul>
                  <li class="title clear-both">
                    <span class="float-left">衡欣牌新姿态粉 原蛋白益生菌</span>
                    <span class="float-right">数量 1</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left">1234567890123431373</span>
                    <span class="float-right red">￥300.00</span>
                  </li>
                  <li class="title">
                    <span class="red danjia">￥300.00</span>
                    <span class="yuanjia">原价￥600.00</span>
                    <span class="huiyuanjia">会员价￥216.50</span>
                  </li>
                </ul>
              </div>
              <div class="queren-xinxi">
                <ul>
                  <li>
                    <span class="float-left">服务人员</span>
                    <span class="float-right select" >
                      <el-dropdown class="user-name" trigger="click">
                        <span class="el-dropdown-link">
                          <span class="font-blue">张三</span> [婴儿游泳]<i class="el-icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item><span class="font-blue">张三</span> [关于作者]</el-dropdown-item>
                          <el-dropdown-item><span class="font-blue">张三</span> [项目仓库]</el-dropdown-item>
                          <el-dropdown-item><span class="font-blue">张三</span> [退出登录]</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </span>
                  </li>
                  <li>
                    <span class="float-left">会员&nbsp;<span class="font-blue">李四</span></span>
                    <span class="float-right">余额￥866.00</span>
                  </li>
                  <li>
                    <span class="float-left">合计</span>
                    <span  class="float-right">￥600.00</span>
                  </li>
                  <li>
                    <span class="float-left">折扣</span>
                    <span  class="float-right">100%</span>
                  </li>
                  <li>
                    <span class="float-left">优惠</span>
                    <span  class="float-right font-blue">-￥5.00</span>
                  </li>
                  <li>
                    <span class="float-left">结算</span>
                    <span class="float-right">￥600.00</span>
                  </li>
                </ul>
                <div class="buttons">
                  <button class="my-btn">选择会员</button>
                  <button @click="jiezhang = true"  class="my-btn">结账</button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!--修改价格弹框-->
      <el-dialog class="gaijia-tanchuan" title="修改价格" :visible.sync="xiugaijiage" width="434px" :center="true">
        <div>
          <el-input class="gaijia-input" placeholder="请输入内容" clearable></el-input>
          <div class="clear-both" style="height: 290px;">
            <div class="float-left">
              <v-keyboard></v-keyboard>
            </div>
            <div class="float-right">
              <el-button class="gaijia-queding-btn">确定</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
      <!--修改数量弹框-->
      <el-dialog class="gaijia-tanchuan" title="修改数量" :visible.sync="xiugaishuliang" width="434px" :center="true">
        <div>
          <el-input class="gaijia-input" placeholder="请输入内容" clearable></el-input>
          <div class="clear-both" style="height: 290px;">
            <div class="float-left">
              <v-keyboard></v-keyboard>
            </div>
            <div class="float-right">
              <el-button class="gaijia-queding-btn">确定</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
      <!--充值按钮弹框-->
      <el-dialog class="chongzhi-tanchuan" title="充值" :visible.sync="chongzhi" width="750px" :center="true">
        <div class="clear-both both">
          <div class="float-left left">
            <div class="one">
              <el-input class="" placeholder="请输入会员手机号" clearable></el-input>
            </div>
            <div class="two">
              <ul>
                <li>
                  <span class="float-left">会员</span>
                  <span class="float-right font-blue">张三</span>
                </li>
                <li>
                  <span class="float-left">累积充值</span>
                  <span class="float-right">¥ 100</span>
                </li>
                <li>
                  <span class="float-left">余额</span>
                  <span class="float-right font-red">¥ 600</span>
                </li>
                <li>
                  <span class="float-left">会员等级</span>
                  <span class="float-right">三星会员&nbsp;<i class="el-icon-question font-blue" @click="huiyuandengjishuoming=true"></i></span>
                </li>
              </ul>
            </div>
            <div class="three">
              <el-radio-group>
                <el-radio :label="3">现价</el-radio>
                <el-radio :label="6">微信</el-radio>
                <el-radio :label="9">支付宝</el-radio>
                <el-radio :label="9">银行卡</el-radio>
              </el-radio-group>
            </div>
            <div class="four">
              <el-input class="" placeholder="请输入充值金额" clearable></el-input>
            </div>
          </div>
          <div class="float-right right">
            <v-keyboard></v-keyboard>
            <el-button class="queding-chongzhi">确定充值</el-button>
          </div>
        </div>
      </el-dialog>
      <!--会员等级说明弹框-->
      <el-dialog class="huiyuandengjishuoming-tanchuan" title="会员等级说明" :visible.sync="huiyuandengjishuoming" width="372px" :center="true">
        <div class="content">
          <span>三星会员：充值200</span>
          <span>四星会员：充值200</span>
          <span>五星会员：充值200</span>
          <span>六星会员：充值200</span>
          <span>七星会员：充值200</span>
        </div>
      </el-dialog>
      <!--结账弹框-->
      <el-dialog class="jiezhang-tanchuan" title="结账" :visible.sync="jiezhang" width="824px" :center="true">
        <div class="clear-both box">
          <div class="float-left my-left">
            <ul>
              <li class="clear-both">
                <span class="float-left">应收</span>
                <span class="float-right font-red">¥ 600</span>
              </li>
              <li class="clear-both">
                <span class="float-left">代金券</span>
                <span class="float-right">¥ 20</span>
              </li>
              <li class="clear-both">
                <span class="float-left">改价</span>
                <span class="float-right">¥ 10</span>
              </li>
              <li class="clear-both">
                <span class="float-left"><span>会员</span> <span class="font-blue">李四</span></span>
                <span class="float-right">余额：¥ 300</span>
              </li>
              <li class="clear-both">
                <span class="float-left"><span>服务人员</span> <span class="font-blue">张三</span></span>
                <span class="float-right"></span>
              </li>
            </ul>
            <div class="div">
              <button>取消</button>
              <button>确认结账</button>
            </div>
          </div>
          <div class="float-right my-right">
            <span>
              <img src="../../assets/icon/checkout-huiyuanka.png" alt="">
              会员卡
            </span>
            <span>
              <img src="../../assets/icon/checkout-xianjing.png" alt="">
              现金
            </span>
            <span>
              <img src="../../assets/icon/checkout-weixin.png" alt="">
              微信
            </span>
            <span>
              <img src="../../assets/icon/checkout-zhifubao.png" alt="">
              支付宝
            </span>
            <span>
              <img src="../../assets/icon/checkout-yinhangka.png" alt="">
              银行卡
            </span>
            <span>
              <img src="../../assets/icon/checkout-meituan.png" alt="">
              美团
            </span>
            <span>
              <img src="../../assets/icon/checkout-zengpin-sel.png" alt="">
              赠送
            </span>
            <span>
              <img src="../../assets/icon/checkout-mendian.png" alt="">
              门店自用
            </span>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import vHead from '../common/Header.vue';
    import vGood from '../common/Good.vue';
    import vKeyboard from '../common/Keyboard.vue';
    export default {
        name: 'Money',
        data() {
            return {
              xiugaijiage: false,//修改价格弹窗显示与否
              xiugaishuliang:false,//修改数量弹窗显示与否
              chongzhi:false,//充值弹窗显示与否
              huiyuandengjishuoming:false,//会员等级说明弹框
              jiezhang:false,//结账对话框显示与否
            }
        },
        components:{
          vHead,vGood,vKeyboard
        },
        beforeMount() {
        },
        mounted() {
        },
        computed: {},
        methods: {
        },
        watch: {},
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
  .bg{
    height: 100%;
    width: 100%;
    background:#a6c9e2;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    /*background: #99a9bf;*/
  }
  .bg-purple {
    /*background: #d3dce6;*/
    height: 100%;
  }
  .bg-purple-light {
    /*background: #e5e9f2;*/
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    /*background-color: #f9fafc;*/
  }
  .all-goods{
    height: calc(100vh - 110px);
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    flex-direction:column;
    .goods-type{
      height: 54px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .fuwu-fenlei-button{
        height:54px;
        background:rgba(245,86,86,1);
        border-radius:10px;border: 0;
        font-size:20px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
      .fenlei-button{
        font-size:20px!important;
        width:138px;
        height:54px;
        border: 0!important;
        background:rgba(107,210,244,1)!important;
        border-radius:10px;
        color:rgba(26,26,26,1)!important;
        font-family:SourceHanSansCN-Regular;
      }
      .page-fenlei-button{
        width:58px;
        height:52px;
        background:rgba(107,210,244,1);
        border-radius:4px;
        border: 0;color:rgba(125,125,125,1);
      }
    }
    .flex-goods{
      height: 700px;
      /*height: 100%;*/
      min-height: 700px;
      max-height: 885px;
      overflow-y: scroll;
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap:wrap;
      justify-content: space-between;
      .goods{
        margin-bottom: 16px;
      }
    }
    .page-buttons{
      text-align: center;
      width: 100%;
      height: 32px;
      .page-button{
        width:84px;
        height:32px;
        background:rgba(245,245,245,1)!important;
        border-radius:4px;
        font-size:18px!important;
        border: 0;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(26,26,26,1)!important;
        margin-left: 20px;
        margin-right: 20px;
      }
      .page-button:active{
        border: none;
        background:rgba(0,0,0,1)!important;
        color:rgba(255,255,255,1)!important;
      }
    }
  }
  .caozuo-buttons{
    height: calc(100vh - 110px);
    width: 100%;display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap:wrap;
    flex-direction:column;
    .caozuo-button{
      width: 154px!important;
      height: 60px!important;
      background:rgba(245,245,245,1)!important;
      border: 0!important;
      border-radius:10px!important;
      font-size:24px!important;
      font-family:SourceHanSansCN-Regular;
      font-weight:400!important;
      color:rgba(26,26,26,1)!important;
    }
    .caozuo-button:active{
      color: #fff!important;
      background:rgba(245,86,86,1)!important;
    }
  }
  .jiesuan-goods{
    overflow: hidden;
    height: calc(100vh - 110px);
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    flex-direction:column;
    .search{
      display: flex;
      background: none;
      border:1px solid rgba(229,229,229,1);
      border-radius:10px;
      .goods-search{
        font-size:22px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(26,26,26,1);
        border-radius:10px;
        input{
          text-align: center!important;
        }
      }
    }
    .pay-goods-box{
      width: 100%;
      height:482px;
      background:rgba(255,255,255,1);
      border-radius:10px;
      overflow-y:scroll;
      ul{
        list-style-type: none;
        padding: 11px;
        border-bottom:1px solid #ccc;
        li{
          width: 100%;
          height: 20px;
          margin-bottom: 14px;
        }
        .title{
          font-size:16px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(26,26,26,1);
          line-height:20px;
          .red{
            color:rgba(248,61,61,1);
          }
          .danjia{
            margin-right: 10px;
          }
          .yuanjia{
            color: #808080;
            margin-right: 10px;
            text-decoration:line-through;
          }
          .huiyuanjia{
            margin-right: 10px;
            color: #2ECAF1;
          }
        }
        .code{
          font-size:14px;
          color:rgba(128,128,128,1);
        }
        li:last-child{
          margin-bottom: 0;

        }
      }
      ul:active{
        background:rgba(190,231,246,1);
      }
    }
    .queren-xinxi{
      width: calc(100% - 30px);
      height:260px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(229,229,229,1);
      border-radius:10px;
      padding: 15px;
      overflow: hidden;
      ul{
        list-style-type: none;
        width: 100%;
        li{
          clear: both;
          min-height: 20px;
          font-size:16px;
          width: 100%;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(128,128,128,1);
          line-height:20px;
          margin-bottom: 16px;
          &:last-child {
            margin-bottom: 15px;
            font-size:22px;
            font-weight:400;
            color:rgba(248,61,61,1);
            line-height:22px;
          }
        }
      }
      .buttons{
        text-align: center;
        .my-btn{
          width:210px;
          height:44px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(46,202,241,1);
          border-radius:4px;
          font-size:24px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          margin-left: 5px;
          margin-right: 5px;
          color:rgba(46,202,241,1);
          &:active{
            border: 0;
            background:rgba(45,194,243,1);
            color:rgba(255,255,255,1);
          }
        }
      }
    }
  }
  .font-red{
    color: #F83D3D;
  }
  .font-blue{
    color:rgba(46,202,241,1);
  }
  .float-left{
    float: left;
  }
  .float-right{
    float: right;
  }
  .clear-both{
    clear:both;
  }

  /*改价,改数量，弹出窗口样式*/
  .gaijia-tanchuan{
    .gaijia-input{
      margin-bottom: 10px;
    }
    .gaijia-queding-btn{
      width:80px;
      height:290px;
      background:rgba(9,183,240,1);
      border-radius:10px;
      border: 0;
      font-size:24px;
      font-family:SourceHanSansCN-Regular;
      font-weight:400;
      color:rgba(239,239,239,1);
      &:active{
        border: none;
      }
    }
  }
  /*充值弹窗样式*/
  .chongzhi-tanchuan{
    border-radius:10px;
    .both{
      width: 700px;
      height: 368px;
      .left{
        width: 394px;
        height: 368px;
        display: flex;
        flex-direction:column;
        justify-content:space-between;
        .one{

        }
        .two{
          width:368px;
          height:122px;
          border:1px solid rgba(210,210,210,1);
          border-radius:8px;
          padding: 27px 12px;
          ul{
            list-style-type: none;
            width: 100%;
            li{
              clear: both;
              min-height: 20px;
              font-size:16px;
              width: 100%;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(128,128,128,1);
              line-height:20px;
              margin-bottom: 16px;
            }
          }
        }
        .three{
          .el-radio-group{
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            flex-direction:row;
            justify-content:space-between;
          }
        }
      }
      .right{
        height: 368px;
        width: 292px;
        display: flex;
        flex-direction:column;
        justify-content:space-between;
        .queding-chongzhi{
          width:292px;
          height:62px;
          background:rgba(45,194,243,1);
          border-radius:10px;;
          font-size:24px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(239,239,239,1);
        }
      }
    }

  }
  /*会员等级说明弹框样式*/
  .huiyuandengjishuoming-tanchuan{
    .content{
      width: 332px;
      display: flex;
      flex-direction:row;
      flex-wrap: wrap;
      justify-content:flex-start;
      span{
        width:150px;
        height:20px;
        overflow: hidden;
        line-height: 20px;
        font-size:16px;
        margin-bottom: 18px;
        margin-left: 8px;
        margin-right: 8px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(128,128,128,1);
      }
    }
  }
  /*结账弹框样式*/
  .jiezhang-tanchuan{
    .box{
      height: 300px;
      .my-left{
        width: 320px;
        height: 100%;
        ul{
          list-style-type: none;
          width: 100%;
          border-radius:8px;
          padding: 34px 12px;
          li{
            clear: both;
            min-height: 20px;
            font-size:16px;
            width: 100%;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(128,128,128,1);
            line-height:20px;
            margin-bottom: 16px;
            &:first-child{
              color: #000;
            }
          }
        }
        .div {
          text-align: center;
          button{
            width:148px;
            height:44px;
            background:rgba(255,255,255,1);
            color: #2ECAF1;
            font-size:20px;
            border:1px solid rgba(46,202,241,1);
            border-radius:8px;
            &:active{
              border:none;
              background:rgba(45,194,243,1);
              color:rgba(255,255,255,1);
            }
          }
        }
      }
      .my-right{
        width: 320px;
        height: 100%;
        span{
          width:176px;
          height:56px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(210,210,210,1);
          border-radius:10px;
          font-size:20px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(26,26,26,1);
        }

      }
    }
  }
</style>
