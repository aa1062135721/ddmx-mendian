<template>
    <div class="login-wrap">
        <div class="ms-login">
            <el-form  label-width="0px" class="demo-ruleForm">
                <div class="logo">
                    <img src="../assets/images/pandalogo.png" alt="">
                    <br>
                    <p>门店管理系统</p>
                </div>

                <el-input  class="urser-name"  placeholder="请输入用户手机号码" v-model="username" @keyup.enter.native="submitForm" prefix-icon="el-icon-user" maxlength="11">
                </el-input>

                <el-input class="password"  placeholder="请输入验证码" v-model="password" @keyup.enter.native="submitForm" prefix-icon="el-icon-lock" maxlength="6">
                    <el-button slot="suffix" round plain size="small" @click="getCode" v-if="canClick" class="sed-code">{{content}}</el-button>
                    <el-button slot="suffix" round plain size="small" v-else class="re-sed-code">{{content}}</el-button>
                </el-input>

                <div class="tips" v-if="msg">
                    <p>{{msg}}</p>
                </div>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>

<!--              <div class="login-type" v-show="type === 2" @click="type = 1">-->
<!--                <p>手机验证码登录</p>-->
<!--              </div>-->
<!--              <div class="login-type" v-show="type === 1" @click="type = 2">-->
<!--                <p>微信二维码登录</p>-->
<!--              </div>-->
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import {postUserInfo, postLoginGetCode, postLoginByCode} from '../api/getData'
import {setCookie} from '../utils'
export default {
  data: function () {
    return {
      msg: '',
      username: '',
      password: '',
      type:1,//1短信验证码登录，2微信二维码登录
      //发送验证码按钮所需要的数据
      canClick: true,
      content: '发送验证码',  // 按钮里显示的内容
      totalTime: 60,      //记录具体倒计时时间
    }
  },
  methods: {
    //获取验证码
    async getCode(){
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.username)) {
        this.msg = '用户名应为手机号码'
        return
      }
      if (!this.canClick) {
        return
      }

      let data = {mobile: this.username}
      await postLoginGetCode(data).then(res => {
        if (res.code === 200) {
          this.$message.closeAll()
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.canClick = false
          this.msg = ''
          this.content = `重新发送(${this.totalTime})`
          let clock = setInterval(() => {
            this.totalTime--
            this.content =  `重新发送(${this.totalTime})`
            if (this.totalTime < 0) {
              clearInterval(clock)
              this.content = '发送验证码'
              this.totalTime = 60
              this.canClick = true  //这里重新开启
            }
          },1000)
        }
      })
    },
    async submitForm () {
      if (this.username === '' || this.password === '') {
        this.msg = '请输入用户名或验证码'
        return
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.username)) {
        this.msg = '用户名应为手机号码'
        return
      }
      let data = {mobile: this.username, code: this.password}
      let that = this
      await postLoginByCode(data).then(async (res) => {
        if (res.code === '200') {
          await setCookie('token', res.data.token) //浏览器保存登录凭证 这儿没有设置cookie的过期时间，默认是关闭浏览器就过期
          await that.saveToken(res.data.token) // vuex保存登录凭证
          await postUserInfo().then(async (res) => {
            await that.saveUserInfo(res.data) // vuex保存登录后的登录数据
            that.$router.push({
              path: '/money',
              query: {}
            })
          })
        } else {

        }
      })
    },
    ...mapActions(['saveUserInfo', 'saveToken'])
  }
}
</script>

<style  lang="less" scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url('../assets/images/login-bg.png');
        background-size: cover;
        font-size:14px;
      .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:398px;
        height:516px;
        margin:-250px 0 0 -199px;
        border-radius: 5px;
        background: #fff;
        text-align: center;
        .urser-name {
          width:324px;
          text-align: center;
          margin-bottom: 20px;
          /deep/ .el-input__inner{
            height:48px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            font-size: 16px!important;
          }
        }
        .password{
          width:324px;
          text-align: center;
          margin-bottom:20px;
          /deep/ .el-input__inner{
            height:48px;
            background:rgba(255,255,255,1);
            border-radius:8px;
            font-size: 16px!important;
          }
        }
        .logo{
          text-align: center;
          width: 100%;
          margin-top: 40px;
          margin-bottom: 26px;
          img{
            height:140px;
          }
          p{
            height:25px;
            font-size:26px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:#2ECAF1;
            margin-top: 20px;
          }
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
        .login-btn{
          width:100%;
          height:48px;
          text-align: center;
          button{
            width:324px;
            height:48px;
          }
        }
        .login-type{
          width:100%;
          margin-top: 5px;
          p{
            width:324px;
            /* border: 1px solid black; */
            margin: auto;
            text-align: right;
            color: #808080;
            font-size: 16px;
          }
        }
      }
    }

</style>

<style scoped>
  .el-input /deep/ .el-input__prefix{
    font-size: 20px;
  }
  .el-input /deep/ .el-input__suffix{
    top: 8px;
    right: 10px;
  }
  .sed-code{
    color: #2ECAF1;
    border-color: #2ECAF1;
  }
  .re-sed-code{
    color: #606266;
    border-color: #606266;
  }
</style>
