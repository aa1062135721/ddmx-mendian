<template>
    <div class="header clear-both">
      <div class="logo float-left">
        <img class="img" src="../../assets/images/logo.png" alt="logo">
        <span class="title">{{userInfo.shop_name}}</span>
      </div>
      <div class="tabs float-right">
          <ul>
            <li @click="goToUrl('/money')" :class="{'active' : $route.path === '/money'}">前台收银</li>
            <li @click="goToUrl('/help')" :class="{'active' : $route.path === '/help'}"><i class="el-icon-question"></i> 帮助中心</li>
            <li @click="handleFullScreen" :class="{'active' : fullscreen}"><i class="el-icon-rank"></i> {{fullscreen ? `取消全屏` : `全屏`}}</li>
            <li>{{userInfo.user_nickname ? userInfo.user_nickname : '超级管理员'}}</li>
            <li @click="handleCommand"><i class="el-icon-switch-button"></i></li>
          </ul>
      </div>
    </div>
</template>
<script>
import { removeStore } from '../../utils'
import { postUserInfo } from '../../api/getData'
export default {
  data () {
    return {
      fullscreen: false,
      userInfo: {
        id: 1, // 用户id
        user_type: 1, //
        sex: 1,
        birthday: 1699200,
        last_login_time: 1560496211,
        score: 0,
        coin: 0,
        create_time: 1510561182,
        user_status: 1,
        user_login: 'admin', // 账号
        user_pass: '###7f4613cc5b4b2a6d99069dbeca8335d9',
        user_nickname: '超级管理员', // 名称
        user_email: '465497241@qq.com', // 邮箱
        user_url: '',
        shop_name:'只能星城店',
        avatar: '',
        signature: '',
        last_login_ip: '127.0.0.1',
        user_activation_key: '',
        mobile: '',
        more: '',
        shop_id: '18', // 用户的商铺id
        balance: 89000000 // 余额
      }
    }
  },
  beforeCreate () {
    postUserInfo().then((res) => {
      this.userInfo = res.data
    }).catch((err) => {
      console.log('获取登录信息失败', err)
    })
  },
  methods: {
    // 跳转到页面
    goToUrl (url) {
      this.$router.push(url)
    },
    // 退出登录
    handleCommand () {
      this.$confirm('您确认退出本系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeStore('token')
        this.$router.push('/login')
      }).catch(() => {
      });
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
    }
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
