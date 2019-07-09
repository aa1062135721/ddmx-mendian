<template>
    <div>
      <div class="header clear-both">
        <div class="logo float-left">
          <!--<img class="img" src="../../assets/images/logo.png" alt="logo">-->
          <span class="title">帮助中心</span>
        </div>
        <div class="tabs float-right">
          <ul>
            <li>
              <el-autocomplete
                popper-class="my-autocomplete"
                v-model="state"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect">
                <i
                  class="el-icon-edit el-input__icon"
                  slot="suffix"
                  @click="handleIconClick">
                </i>
                <!--<template slot-scope="{ item }">-->
                <!--<div class="name">{{ item.value }}</div>-->
                <!--<span class="addr">{{ item.address }}</span>-->
                <!--</template>-->
              </el-autocomplete>
            </li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <!--<li class="active">前台收银</li>-->
            <!--<li @click="goToUrl('/help')"><i class="el-icon-question"></i> 帮助中心</li>-->
            <!--<li @click="handleFullScreen"><i class="el-icon-rank"></i> 全屏</li>-->
            <!--<li>{{userInfo.user_nickname ? userInfo.user_nickname : '超级管理员'}}</li>-->
            <!--<li @click="handleCommand"><i class="el-icon-switch-button"></i></li>-->
          </ul>
        </div>
      </div>
      <div class="my-body">
        内容
      </div>
    </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      // TODO
    }
  },
  components: {},
  beforeMount () {
  },
  mounted () {
    // TODO
  },
  computed: {},
  methods: {
    // TODO
  },
  watch: {},
  beforeDestroy () {
  }
}
</script>

<style scoped lang="less">
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 68px;
    font-size: 22px;
    color: #fff;
    background:linear-gradient(90deg,rgba(61,181,219,1) 0%,rgba(48,156,228,1) 100%);
    overflow: hidden;
    padding: 0 0 0 90px;
    .logo{
      height: 68px;
      line-height: 68px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
      justify-content:flex-start;
      align-items:center;
      .img{
        height: 40px;
        margin-right: 125px;
      }
      .title{
        font-size:24px;
        font-family:SourceHanSansCN-Bold;
        font-weight:bold;
        color:rgba(255,255,255,1);
        height: 68px;
        width: auto;
        line-height: 68px;
      }
    }
    .tabs{
      height: 68px;
      line-height: 68px;
      ul{
        list-style-type: none;
        height: 68px;
        display: flex;
        flex-direction:row;
        flex-wrap:nowrap;
        justify-content:flex-end;
        align-items:center;
        li{
          height: 68px;
          line-height: 68px;
          font-size:16px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color: #ffffff;
          padding: 0 36px;
          &:hover{
            cursor:pointer;
          }
        }
        .active{
          background: #2b8fda;
        }
      }
    }
  }
</style>
