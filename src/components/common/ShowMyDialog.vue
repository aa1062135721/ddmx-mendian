<template>
    <div>
      <el-dialog :title="title" :visible.sync="dialogTableVisible" width="298px">
       <div class="box">
         <img src="" alt="">
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
    title: {// 对话框标题
      type: String,
      default: ''
    },
    dialogTableVisible: {// 对话框显示与否
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    }
  },
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
.box{
  width:298px;
  height:298px;
  background:rgba(255,255,255,1);
  border-radius:10px;
  img{
    width:83px;
    height:104px;
  }
  .txt{
    width:117px;
    height:29px;
    font-size:30px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(26,26,26,1);
    text-align: center;
  }
}
</style>
