<template>
    <div class="bg">
      <div class="left">
        <img src="../../assets/images/logo.png" alt="">
      </div>
      <div class="middle">
      </div>
      <div class="right">
        <div class="div">
          <p class="title">
            贝亲奶瓶自然实感宽口psu塑料奶瓶配L号贝亲奶瓶自然实感宽口psu塑料奶瓶配L号贝亲奶瓶自然实感宽口psu塑料奶瓶配L号贝亲奶瓶自然实感宽口psu塑料奶瓶配L号贝亲奶瓶自然实感宽口psu塑料奶瓶配L号
          </p>
        </div>
        <div class="div">
        </div>
        <div>
          <p class="yuanjia">
            原价: ¥ 198.00
          </p>
        </div>
        <div>
          <span class="xianjia">
            现价: ¥ 198.00
          </span>
          <span class="kucun">
            <img src="../../assets/icon/kucun.png" alt="库存"> 99+
          </span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'good',
        data() {
            return {
                // TODO
            }
        },
        components: {},
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

<style  scoped>
  .bg{
    width:324px;
    height:150px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(229,229,229,1);
    border-radius:8px;
    overflow: hidden;
  }
  .left{
    width:126px;
    height:122px;
    background:rgba(255,255,255,1);
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 15px;
    float: left;
  }
  .left img{
    width:96px;
    height:122px;
    border-radius:8px 0px 0px 8px;
  }
  .middle{
    float: left;
    height: 100%;
    border-right:1px solid rgba(229,229,229,1);
  }
  .right{
    padding-left: 3px;
    float: left;
    width: 164px;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 15px;
  }
  .right .div{
    height: 39px;
  }
  .title{
    width:186px;
    height:46px;
    font-size:16px;
    font-weight:400;
    color:rgba(26,26,26,1);
    line-height:23px;
    font-family:SourceHanSansCN-Regular;
    overflow: hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .yuanjia{
    font-size:16px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    text-decoration:line-through;
    color:rgba(128,128,128,1);
    line-height:20px;
  }
  .xianjia{
    font-size:16px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(46,202,241,1);
    line-height:20px;
  }
  .kucun{
    font-size:14px;
    float: right;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(26,26,26,1);
    line-height:20px;
  }
  .kucun img{
    margin-right: 3px;
  }
</style>
