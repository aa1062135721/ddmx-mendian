<template>
    <div class="page-help bg-blue">
      <div class="header clear-both">
        <div class="logo float-left">
          <img class="img" src="../../assets/images/logo.png" alt="logo"  @click="goToUrl('/home')">
          <span class="title">帮助中心</span>
        </div>
        <div class="tabs float-right">
          <ul>
            <li>
              <el-input
                placeholder="请输入内容"
                style="width:496px;"
                v-model="content"
                @keyup.enter.native="goSearchHelp"
              >
                <i slot="suffix" class="el-input__icon el-icon-search" @click="goSearchHelp"></i>
              </el-input>
            </li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <div class="my-body clear-both">
          <ul  class="left float-left" v-infinite-scroll="loadMoreHelps" infinite-scroll-immediate="false">
            <li v-for="(item, index) in hepls" :key="item.id" :class="{'active' : item.is_checked}" @click="clickTiltle(index)">
              <span class="title float-left overflow-row1-ellipsis"><span v-html="item.title"></span></span>
              <i class="el-icon-arrow-right float-right"></i>
            </li>
          </ul>
        <div class="right float-right">
          <h1 class="title" v-if="hepls.length" v-html="hepls[index].title"></h1>
          <div class="content" v-if="hepls.length" v-html="hepls[index].content"></div>
        </div>
      </div>
    </div>
</template>

<script>
import { postGetHelpList } from '../../api/getData'
export default {
  name: 'Index',
  data () {
    return {
      noMore:false,
      content: '', // 搜索的内容
      index: 0, // 当前被选中的
      requestData: { // page: '1,20'
        page: 1,
        limit: 20
      },
      hepls: [
        {is_checked: true, id: 0, title: '', content: ``}
      ]
    }
  },
  components: {},
  beforeMount () {
    this.searchHelp()
  },
  computed: {},
  methods: {
    clickTiltle (index) {
      this.index = index
      this.hepls.map((item) => {
        item.is_checked = false
      })
      this.hepls[index].is_checked = true
    },
    searchHelp () {
      let requestData = {
        content: this.content,
        page: `${this.requestData.page},${this.requestData.limit}`
      }
      if (!requestData.content) {
        delete requestData.content
      }
      postGetHelpList(requestData).then(res => {
        if (res.data.length) {
          if (requestData.content) {
            res.data.forEach(item => {
              // 匹配关键字正则
              let replaceReg = new RegExp(requestData.content, 'gi')
              // 高亮替换v-html值
              let replaceString = '<span style="color:#2ECAF1;">' + requestData.content + '</span>'
              // 开始替换
              item.title = item.title.replace(replaceReg, replaceString)
              item.content = item.content.replace(replaceReg, replaceString)
              item.is_checked = false
            })
            this.hepls = res.data
            this.hepls[0].is_checked = true
          } else {
            res.data.map(item => {
              item.is_checked = false
            })
            if (this.requestData.page === 1) {
              this.hepls = res.data
              this.noMore = false
              this.hepls[0].is_checked = true
            } else{
              this.hepls.push(...res.data)
            }
          }
        } else {
          this.noMore = true
        }
      }).catch(err => {
        console.log(err)
      })
    },
    goSearchHelp(){
      this.noMore = false
      this.requestData.page = 1
      this.searchHelp()
    },
    loadMoreHelps(){
      if (this.noMore){
        return
      }
      this.requestData.page += 1
      this.searchHelp()
    },
    // 跳转到页面
    goToUrl (url) {
      this.$router.push(url)
    },
  },
  beforeDestroy () {
  }
}
</script>

<style lang="less" scoped>
  .page-help{
    height: 100%;
    width: 100%;
    overflow: hidden;
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
            .el-input__inner{
              border-radius:22px!important;
            }
            .el-input__icon{
              /*font-size: 20px!important;*/
            }
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
    .my-body{
      height: 100%;
      width: 100%;
      .left{
        height: calc(100% - 68px);
        overflow-y:auto;
        width:398px;
        background: #fff;
        text-align: center;
        list-style-type: none;
        width:398px;
        li{
          clear: both;
          overflow-x: hidden;
          cursor:pointer;
          height:84px;
          line-height: 84px;
          width: calc(100% - 20px);
          padding: 0 10px;
          text-align: center;
          border-bottom:1px solid rgba(204,204,204,1);
          font-size:24px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(26,26,26,1);
          .title{
            width: 80%;
          }
          i{
            color: #B8B8B8;
            font-size: 24px;
            font-weight: bolder;
            height: 84px;
            line-height: 84px;
          }
        }
        .active{
          background:rgba(235,235,235,1);
        }
      }
      .right{
        height: calc(100% - 68px);
        width:1436px;
        overflow: auto;
        overflow-x: hidden;
        background: #fff;
        .title{
          font-size:30px;
          line-height: 35px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(26,26,26,1);text-align: center;margin: 50px 0;
        }
        .content{
           font-size:20px;
           font-family:SourceHanSansCN-Regular;
           font-weight:400;
           color:rgba(26,26,26,1);
           line-height:30px;
           text-align:justify;
           width:calc(1436px - 60px);
           padding: 30px;
           height: calc(100% - 95px - 30px);
           margin-top: 50px;
        }
      }
    }
  }
</style>
