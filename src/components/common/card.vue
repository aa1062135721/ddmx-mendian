<template>
    <div class="bg">
      <div class="card" :class="{'active' : ocard.is_checked}">
        <img v-if="ocard.is_checked" class="ischeck" src="../../assets/icon/is-chooese.png" alt="卡片被选中">
        <div class="head_body"
             :class="{'head_body_bg_color_time' : ocard.type === '1', 'head_body_bg_color_month' : ocard.type === '2',  'head_body_bg_color_year' : ocard.type === '4',}">
          <div class="title overflow-row1-ellipsis">
            <img v-if="ocard.type === '2'" src="../../assets/icon/card-month.png" alt="月卡图标">
            <img v-if="ocard.type === '1'" src="../../assets/icon/card-times.png" alt="次卡图标">
            <img v-if="ocard.type === '4'" src="../../assets/icon/card-year.png" alt="年卡图标">
            <span>{{ocard.card_name}}（<span class="font-red">{{ocard.month}}</span>个月）</span>
          </div>
          <div class="body1">
            <span class="font-red float-left" style="font-size: 16px;">￥</span>
            <span class="font-red float-left">{{ocard.price}}</span>
            <span class="float-right">查看详情</span>
          </div>
          <div class="body2 overflow-row1-ellipsis" v-if="ocard.service.length">
            <span class="float-left" v-if="ocard.service[0]">{{ocard.service[0].service_name}} {{ocard.service[0].num}}次</span>
            <span class="float-right" v-if="ocard.service[1]">{{ocard.service[1].service_name}} {{ocard.service[1].num}}次</span>
          </div>
          <div class="body2 overflow-row1-ellipsis" v-if="ocard.service.length">
            <span class="float-left" v-if="ocard.service[2]">{{ocard.service[2].service_name}} {{ocard.service[2].num}}次</span>
            <span class="float-right" v-if="ocard.service[3]">{{ocard.service[3].service_name}} {{ocard.service[3].num}}次</span>
          </div>
        </div>
        <div class="footer">
          <span class="float-left">最低价格：{{ocard.mprice}}元</span>
          <span class="float-right">有效期：{{ocard.end_time}}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    ocard: {
      type: Object
    }
  },
  data () {
    return {
    }
  }

}
</script>

<style lang="less" scoped>
  .bg{
    width:404px;
    height:204px;
    border-radius:10px;
    font-size:16px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:#ffffff;
    background: #ffffff;
    box-shadow:0px 0px 11px 1px rgba(33,33,33,0.19);
    .card{
      width:100%;
      height:100%;
      border-radius:10px;
      position: relative;
      overflow: hidden;
      .ischeck{
        position: absolute;
        right: 0;
        top: 0;
      }
      .head_body{
        padding: 20px;
        width: calc(100% - 40px);
        height: 132px;
        .title{
          width:100%;
          line-height: 40px;
          height: 40px;
          font-size:24px;
          font-weight:400;
          color: rgba(26,26,26,1);
          img{
            width: 40px;
            height: 40px;
            vertical-align:middle;
            margin-right: 3px;
          }
        }
        .body1{
          height:37px;
          line-height: 37px;
          font-size:37px;
          margin-top: 10px;
          margin-bottom: 10px;
          .float-right{
            font-size:20px;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
        }
        .body2{
          height: 16px;
          font-weight:400;
          margin-top: 10px;
          margin-bottom: 0px;
          font-size: 16px;
          line-height: 16px;
          color:rgba(255,255,255,1);
        }
      }
      .head_body_bg_color_month{
        background: #f6c291;
      }
      .head_body_bg_color_time{
        background: #F6BED6;
      }
      .head_body_bg_color_year{
        background: #BECCF6;
      }
      .footer{
        width:100%;
        height:32px;
        line-height: 32px;
        font-size:16px;
        color: #808080;
        span{
          &:first-child{
            margin-left: 20px;
          }
          &:last-child{
            margin-right: 20px;
          }
        }
      }
    }
    .active{
      border: 1px solid red;
    }
  }
</style>
