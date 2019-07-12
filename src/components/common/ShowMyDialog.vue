<template>
    <div>
      <el-dialog :visible.sync="visible" width="298px">
       <div class="box">
         <img  src="../../assets/images/alert-logo.png" alt="图片">
         <div class="txt">
           {{content}}
         </div>
       </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'ShowMyDialog',
  props: {
    dialogTableVisible: {// 对话框显示与否
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    seconds: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      visible: this.dialogTableVisible,
      timer: ''
    }
  },
  components: {},
  beforeMount () {
  },
  mounted () {
    setTimeout(() => {
      this.visible = false
    }, this.seconds)
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
.box{
  width:100%;
  border-radius:10px;
  text-align: center;
  img{
    margin: auto;
    width:83px;
    height:104px;
  }
  .txt{
    width:100%;
    height:30px;
    line-height: 30px;
    font-size:30px;
    margin-top: 35px;
    margin-bottom: 64px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(26,26,26,1);
    text-align: center;
  }
}
</style>
