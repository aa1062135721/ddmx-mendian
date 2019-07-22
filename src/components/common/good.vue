<template>
    <div class="bg">
      <div class="left">
        <img  v-lazy="ogood.pic" alt="商品封面">
      </div>
      <div class="middle">
      </div>
      <div class="right">
        <div class="div">
          <p class="title overflow-row1-ellipsis">
            {{ogood.title}}
          </p>
        </div>
        <div class="div">
          <p class="title overflow-row1-ellipsis" v-if="ogood.is_service_goods === '0'">
            条形码：{{ogood.bar_code}}
          </p>
        </div>
        <div>
          <p class="yuanjia overflow-row1-ellipsis" v-if="ogood.is_service_goods === '1'">
             原价: ¥ {{ogood.price}}
          </p>
        </div>
        <div class="goods_price">
          <span class="xianjia">
            现价: ¥ {{ogood.price}}
          </span>
          <span class="kucun" v-if="ogood.stock || ogood.stock >= 0">
            <img src="../../assets/icon/kucun.png" alt="库存"> {{ogood.stock}}
          </span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'good',
  props: {
    ogood: {
      type: Object
    }
  },
  data () {
    return {
    }
  }

}
</script>

<style  scoped>
  .bg{
    width:326px;
    height:152px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    overflow: hidden;
    clear: both;
  }
  .left{
    width:126px;
    height:152px;
    background:rgba(255,255,255,1);
    float: left;
  }
  .left img{
    width:126px;
    height:152px;
    border-radius:8px 0px 0px 8px;
  }
  .middle{
    float: left;
    height: 100%;
    border-right:1px solid rgba(229,229,229,1);
  }
  .right{
    width: 169px;
    float: left;
    padding: 15px;
  }
  .right .div{
    height: 39px;
  }
  .title{
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
  .goods_price{
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    /*float: right;*/
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(26,26,26,1);
    line-height:20px;
  }
  .kucun img{
    margin-right: 3px;
  }
</style>
