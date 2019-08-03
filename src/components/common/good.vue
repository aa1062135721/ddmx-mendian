<template>
    <div class="bg">
      <div class="left">
        <img  v-lazy="ogood.pic" alt="商品封面">
      </div>
      <div class="middle">
      </div>
      <div class="right">
        <div class="right-title overflow-row2-ellipsis">
          <p>
            {{ogood.title}}
          </p>
        </div>
        <div class="right-body">
          <p class="goods_price qrcode overflow-row1-ellipsis" v-if="ogood.is_service_goods === '0'" style="margin-bottom: 3px;">
            条形码：{{ogood.bar_code || '无'}}
          </p>
          <p class="goods_price overflow-row1-ellipsis" v-if="ogood.is_service_goods === '0'">
            <span class="xianjia">¥ {{parseFloat(ogood.price).toFixed(2)}}</span>
            <span class="kucun" v-if="ogood.stock && ogood.stock <= 99"><img src="../../assets/icon/kucun.png" alt="库存"> {{parseInt(ogood.stock)}}</span>
            <span class="kucun" v-else><img src="../../assets/icon/kucun.png" alt="库存"> 99+</span>
          </p>
          <p class="goods_price overflow-row1-ellipsis" v-if="ogood.is_service_goods === '1'">
            <span class="xianjia"> ¥ {{parseFloat(ogood.price).toFixed(2)}}</span>
          </p>
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

<style  scoped lang="less">
  .bg{
    width:326px;
    height:152px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    overflow: hidden;
    clear: both;
    .left{
      width:126px;
      height:152px;
      background:rgba(255,255,255,1);
      float: left;
      img{
        width:126px;
        height:152px;
        border-radius:8px 0px 0px 8px;
      }
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
      /*flex: 1;*/
      height: 100%;
      display: flex;
      flex-direction: column;
      .right-title{
        height: 40px;
        color: #1A1A1A;
        font-size: 16px;
        margin-bottom: 43px;
      }
      .right-body{
        .goods_price{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .xianjia{
            font-size:16px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:#f83d3d;
            line-height:20px;
          }
          .kucun{
            font-size:14px;
            /*float: right;*/
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(26,26,26,1);
            line-height:20px;
            img{
              margin-right: 3px;
            }
          }
        }
        .qrcode{
          font-size:14px;
          font-weight:400;
          color:#C2C2C2;
        }
      }
    }
  }
</style>
