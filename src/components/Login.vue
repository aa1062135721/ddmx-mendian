<template>
    <div class="login-wrap">
        <div class="ms-login">
            <el-form  label-width="0px" class="demo-ruleForm">
                <div class="logo">
                    <img src="../assets/images/pandalogo.png" alt="">
                    <br>
                    <p>门店管理系统</p>
                </div>

                <el-input  class="urser-name"  placeholder="请输入用户名称" v-model="username"    prefix-icon="el-icon-user">
                </el-input>

                <el-input class="password" type="password"  placeholder="请输入登录密码" v-model="password"    prefix-icon="el-icon-lock">
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
  import {postLogin} from '../api/getData'
  import {setStore} from '../utils'
    export default {
        data: function(){
            return {
              msg: '',
              username: 'lizhanghong',
              password: 'ddxm123'
            }
        },
        methods: {
            submitForm() {
                if (this.username=='' || this.password == '') {
                  this.msg = '请输入用户名或密码'
                  return
                }
                let data = {username:this.username, password:this.password}
                let that = this
                postLogin(data).then((res) => {
                  if (res.code === '200') {
                    setStore('token', res.data.token)
                    that.$router.push({
                      path: '/money',
                      query: {}
                    })
                  } else {

                  }
                })
            }
        }
    }
</script>

<style>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../assets/images/login-bg.png);
        background-size: cover;
        font-size:14px;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:468px;
        height:616px;
        margin:-308px 0 0 -234px;
        /* padding:40px; */
        border-radius: 5px;
        background: #fff;
        text-align: center;
        /* border: 1px solid black; */
    }
    .logo{
        text-align: center;
        width: 100%;
        margin-top: 56px;
        margin-bottom: 48px;
    }
    .tips{
        width:100%;
        /* border: 1px solid red; */
        text-align: center;
        margin-bottom: 14px;
    }
    .tips p{
        width:324px;
        font-size:12px;
        /* border: 1px solid black; */
        margin: auto;
        text-align: left;
        color:red;
    }

    .logo img{
        height:140px;
    }
    .logo p{
        height:25px;
        font-size:26px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(15,156,242,1);
        margin-top: 40px;
    }
    .urser-name {
        width:324px;
        text-align: center;
        margin-bottom: 14px;
    }
    .urser-name .el-input__inner{
        height:48px;
        background:rgba(255,255,255,1);
        border-radius:8px;
    }

    .password{
        width:324px;
        text-align: center;
        margin-bottom: 14px;
    }
    .password .el-input__inner{
        height:48px;
        background:rgba(255,255,255,1);
        border-radius:8px;
    }

    .login-btn{
        width:100%;
        height:48px;
        text-align: center;
    }
    .login-btn button{
        width:324px;
        height:48px;
    }
</style>
