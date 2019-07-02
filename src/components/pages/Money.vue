<template>
    <div class="bg">
      <v-head></v-head>
      <div style="padding: 20px 20px;">
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
              <div>
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
                </div>
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
              <el-button class="caozuo-button" type="primary">数量</el-button>
              <br><br>
              <el-button class="caozuo-button" type="primary">改价</el-button>
              <br><br>
              <el-button class="caozuo-button" type="primary">删除</el-button>
              <br><br>
              <el-button class="caozuo-button" type="primary">充值</el-button>
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
                    <span>服务人员</span>
                    <!--<span>张三[婴儿游泳]</span>el-icon-arrow-down-->
                    <el-select   placeholder="请选择" value="张三[婴儿游泳]">
                      <el-option
                        key="1"
                        label="张三"
                        value="张三">
                      </el-option>
                      <el-option
                        key="2"
                        label="李四"
                        value="李四">
                      </el-option>
                    </el-select>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
    import vHead from '../common/Header.vue';
    import vGood from '../common/Good.vue';
    export default {
        name: 'Money',
        data() {
            return {
            }
        },
        components:{
          vHead,vGood
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
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
    height: 100%;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
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
        width:84px;
        height:32px;
        border: 0;
        background:rgba(0,0,0,1)!important;
        color:rgba(255,255,255,1)!important;
        border-radius:4px;
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
      background:rgba(255,255,255,1);
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
      width:100%;
      height:280px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(229,229,229,1);
      border-radius:10px;

    }
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

</style>
