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

                <el-input class="password" type="password"  placeholder="请输入登录密码" v-model="password" @keyup.enter.native="submitForm" prefix-icon="el-icon-lock">
                </el-input>

                <div class="tips" v-if="msg">
                    <p>{{msg}}</p>
                </div>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>

            </el-form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import {postLogin, postUserInfo} from '../api/getData'
import {setCookie} from '../utils'
export default {
  data: function () {
    return {
      msg: '',
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm () {
      if (this.username === '' || this.password === '') {
        this.msg = '请输入用户名或密码'
        return
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.username)) {
        this.msg = '用户名应为手机号码'
        return
      }
      let data = {username: this.username, password: this.password}
      let that = this
      postLogin(data).then((res) => {
        if (res.code === '200') {
          setCookie('token', res.data.token) //浏览器保存登录凭证 这儿没有设置cookie的过期时间，默认是关闭浏览器就过期
          that.saveToken(res.data.token) // vuex保存登录凭证
          postUserInfo().then((res) => {
            that.saveUserInfo(res.data) // vuex保存登录后的登录数据
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

<style  lang="less">
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
          font-size: 20px;
          .el-input__inner{
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
          font-size: 20px;
          .el-input__inner{
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
      }
    }

</style>
