<template>
    <div class="header clear-both">
      <div class="logo float-left">
        <img class="img" src="../../assets/images/logo.png" alt="logo"  @click="goToUrl('/home/order')">
        <span class="title">{{userInfo.shop_name}}</span>
      </div>
      <div class="tabs float-right">
          <ul>
            <li @click="goToUrl('/money')" v-if="$route.path !== '/money'">前台收银</li>
            <li @click="goToUrl('/home/order')" v-else>进入后台</li>
            <li @click="goToUrl('/help')" :class="{'active' : $route.path === '/help'}"><i class="el-icon-question"></i> 帮助中心</li>
            <li @click="handleFullScreen" :class="{'active' : fullscreen}"><i class="el-icon-rank"></i> {{fullscreen ? `取消全屏` : `全屏模式`}}</li>
            <li>{{userInfo.user_nickname}}</li>
            <li @click="handleCommand"><i class="el-icon-switch-button"></i></li>
          </ul>
      </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { removeCookie } from '../../utils'
export default {
  data () {
    return {
      fullscreen: false
    }
  },
  methods: {
    // 跳转到页面
    goToUrl (url) {
      if (url === '/help') {
        window.open('#/help')
        return
      }
      this.$router.push(url)
    },
    // 退出登录
    handleCommand () {
      this.$confirm('您确认退出本系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeCookie('token')
        this.setUserInfo()
        this.setToken('')
        this.$router.push('/login')
      }).catch(() => {
      })
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    ...mapMutations(['setUserInfo', 'setToken'])
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>
<style lang="less" scoped>
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
