<template>
    <div class="btns">
      <div>
        <el-button class="btn" @click="sendMsg('1')">1</el-button>
        <el-button class="btn" @click="sendMsg('2')">2</el-button>
        <el-button class="btn" @click="sendMsg('3')">3</el-button>
      </div>
      <div>
        <el-button class="btn" @click="sendMsg('4')">4</el-button>
        <el-button class="btn" @click="sendMsg('5')">5</el-button>
        <el-button class="btn" @click="sendMsg('6')">6</el-button>
      </div>
      <div>
        <el-button class="btn" @click="sendMsg('7')">7</el-button>
        <el-button class="btn" @click="sendMsg('8')">8</el-button>
        <el-button class="btn" @click="sendMsg('9')">9</el-button>
      </div>
     <div>
       <el-button class="btn"  @click="sendMsg('0')" style="width: 288px;">0</el-button>
     </div>
    </div>
</template>

<script>
export default {
  name: 'Keyboard-without-point',
  data () {
    return {
    }
  },
  methods: {
    sendMsg (num) {
      this.$emit('getNumber', num) // 第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    }
  }
}
</script>

<style lang="less" scoped>
  .btns{
    display: flex;
    flex-direction:column;
    flex-wrap:wrap;
    justify-content:space-between;
    width: 292px;
    height: 290px;
    overflow: hidden;
    div{
      .btn{
        width:88px;
        height:62px;
        background:rgba(239,239,239,1);
        border-radius:10px;
        font-size:24px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(26,26,26,1);
        line-height:23px;
        &:active{
          background:rgba(204,204,204,1);
          border: none;
        }
      }
    }
  }

</style>
