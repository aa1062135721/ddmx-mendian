<template>
    <div class="bg">
      <v-head></v-head>
      <div style="padding: 5px 20px;">
        <el-row :gutter="20">
          <el-col :span="14">
            <div class="grid-content">
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
              </div>
              <div style="text-align: center;">
                <button class="page-button">上一页</button>
                <button class="page-button">下一页</button>
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content" style="height: calc(100vh - 110px);
width: 100%;display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap:wrap;
    flex-direction:column;
">
              <el-button class="caozuo-button" type="primary">&nbsp;&nbsp;+&nbsp;&nbsp;</el-button>
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
          <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
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
            // TODO
        },
        computed: {},
        methods: {
            // TODO
        },
        watch: {},
        beforeDestroy() {
        }
    }
</script>

<style>
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
  .flex-goods{
    height: 100%;
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap:wrap;
    justify-content: space-between;
  }
  .flex-goods .goods{
    margin-bottom: 16px;
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
  .goods-type{
    margin-bottom: 28px;width: 100%;display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .goods-type .fuwu-fenlei-button{
    height:54px;
    background:rgba(245,86,86,1);
    border-radius:10px;border: 0;
    font-size:20px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .goods-type .fenlei-button{
    font-size:20px!important;
    width:138px;
    height:54px;
    border: 0!important;
    background:rgba(107,210,244,1)!important;
    border-radius:10px;
    color:rgba(26,26,26,1)!important;
    font-family:SourceHanSansCN-Regular;
  }
  .goods-type .page-fenlei-button{
    width:58px;
    height:52px;
    background:rgba(107,210,244,1);
    border-radius:4px;
    border: 0;color:rgba(125,125,125,1);
  }
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

</style>
