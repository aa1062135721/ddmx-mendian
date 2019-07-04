<template>
    <div class="btns">
      <div>
        <el-button class="btn">1</el-button>
        <el-button class="btn">2</el-button>
        <el-button class="btn">3</el-button>
      </div>
      <div>
        <el-button class="btn">4</el-button>
        <el-button class="btn">5</el-button>
        <el-button class="btn">6</el-button>
      </div>
      <div>
        <el-button class="btn">7</el-button>
        <el-button class="btn">8</el-button>
        <el-button class="btn">9</el-button>
      </div>
     <div>
       <el-button class="btn" style="width: 190px;">0</el-button>
       <el-button class="btn">.</el-button>
     </div>
    </div>
</template>

<script>
export default {
  name: 'Keyboard',
  data () {
    return {
    }
  },
  components: {},
  beforeMount () {
  },
  mounted () {
  },
  computed: {},
  methods: {
  },
  watch: {},
  beforeDestroy () {
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
