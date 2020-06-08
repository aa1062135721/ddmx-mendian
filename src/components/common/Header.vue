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
            <li>
                <el-dropdown class="header_username" placement="top" trigger="click">
                  <span>{{userInfo.user_nickname}}</span>
                  <el-dropdown-menu slot="dropdown" >
                    <div @click="flag=true">
                         <el-dropdown-item class="changePwd" >修改密码</el-dropdown-item>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li @click="handleCommand"><i class="el-icon-switch-button"></i></li>
          </ul>
      </div>
      <div class="popupW" v-if="flag">
        <el-input v-model="pwd" placeholder="请输入密码" ></el-input>
         <div class="tips" v-if="msg">
            <p>{{msg}}</p>
          </div>
       <div>
          <el-button type="primary" @click="changePwd">确定</el-button>
          <el-button type="info" @click="close_btn">取消</el-button>
       </div>
      </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { removeCookie } from '../../utils'
// eslint-disable-next-line no-unused-vars
import { changePassword } from '../../api/getData.js'
export default {
  data () {
    return {
      fullscreen: false,
      flag: false,
      pwd: '',
      msg: ''
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
    // 修改密码
    changePwd () {
      // eslint-disable-next-line no-unused-vars
      let data = {password: this.pwd}
      if (/[^a-za-z0-9u4e00-u9fa5]/g.test(this.pwd)) {
        this.msg = '密码只能由数字，字母组成'
        return
      }
      changePassword(data).then((res) => {
        if (res.code === '200') {
          this.flag = false
          this.pwd = ''
          this.msg = ''
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      })
    },
    // 关闭修改密码
    close_btn () {
      this.flag = false
      this.pwd = ''
      this.msg = ''
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
        // 修改密码弹框
        .popupW{
          width: 400px;
          height: 200px;
          padding: 20px;
          border: 1px solid rgb(124, 124, 124);
          background: rgb(255, 255, 255);
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          box-sizing: border-box;
         >div{
           margin-top: 20px;
           display: flex;
           justify-content: space-around;
         }
         .tips{
          width:100%;
          /* border: 1px solid red; */
          text-align: center;
          margin-bottom: 20px;
          p{
            width:324px;
            font-size:12px;
            /* border: 1px solid black; */
            margin: auto;
            text-align: left;
            color:red;
          }
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
            .header_username{
              font-size: 16px;
              color: #fff;
            }
            .active{
              background: #2b8fda;
            }
          }
        }
    }
</style>
