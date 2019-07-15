<template>
    <div class="bg bg-blue">
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
                v-model="content"
                placeholder="请输入内容"
                >
                <i
                  class="el-icon-edit el-input__icon"
                  slot="suffix"
                 >
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
      <div class="my-body clear-both">
        <el-scrollbar class="left float-left">
          <ul>
            <li>
              <span class="title float-left overflow-row1-ellipsis">第1次测第1次测试第1次测试第1次测试第1次测试第1次测试试</span>
              <i class="el-icon-arrow-right float-right"></i>
            </li>
          </ul>
        </el-scrollbar>
        <div class="right float-right">
            dfasdf
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      content: '', // 搜索的内容
      requestData: { // page: '1,20'
        page: 1,
        limit: 20
      },
      hepls: [
        {
          id: 1,
          title: '第1次测试',
          content: `<p><span style="text-align: justify;">6月14日，英国皇家科学院院士、英国皇家工程院院士安妮·尼维尔（Anne Neville）到长安汽车进行交流，并带来了以《表面工程在下一代汽车零部件摩擦和腐蚀方面的重要性》为题的精彩分享。</span><br style="text-align: justify;"><span style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp; 安妮·尼维尔教授的交流，为大力推进科技创新的长安汽车提供了一个交流学习的机会，长安汽车也通过此次交流向世界展现一个正在从汽车大国迈向汽车强国应有的技术实力。</span><br style="text-align: justify;"><span style="text-align: justify;"></span><img title="1560510190912758.jpg" alt="1.jpg" src="http://www.changan.com.cn/uploads_ueditor/image/20190614/1560510190912758.jpg" _src="//www.changan.com.cn/uploads_ueditor/image/20190614/1560510190912758.jpg" style="text-align: justify;"><span style="text-align: justify;">加强国际交流，英国皇家两院院士专程分享</span></p>`
        },
        {
          id: 2,
          title: '第2次测试',
          content: `<p><span style="text-align: justify;">6月14日，英国皇家科学院院士、英国皇家工程院院士安妮·尼维尔（Anne Neville）到长安汽车进行交流，并带来了以《表面工程在下一代汽车零部件摩擦和腐蚀方面的重要性》为题的精彩分享。</span><br style="text-align: justify;"><span style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp; 安妮·尼维尔教授的交流，为大力推进科技创新的长安汽车提供了一个交流学习的机会，长安汽车也通过此次交流向世界展现一个正在从汽车大国迈向汽车强国应有的技术实力。</span><br style="text-align: justify;"><span style="text-align: justify;"></span><img title="1560510190912758.jpg" alt="1.jpg" src="http://www.changan.com.cn/uploads_ueditor/image/20190614/1560510190912758.jpg" _src="//www.changan.com.cn/uploads_ueditor/image/20190614/1560510190912758.jpg" style="text-align: justify;"><span style="text-align: justify;">加强国际交流，英国皇家两院院士专程分享</span></p>`
        },
        {
          id: 3,
          title: '第3次测试',
          content: `<p><span style="text-align: justify;">6月14日，英国皇家科学院院士、英国皇家工程院院士安妮·尼维尔（Anne Neville）到长安汽车进行交流，并带来了以《表面工程在下一代汽车零部件摩擦和腐蚀方面的重要性》为题的精彩分享。</span><br style="text-align: justify;"><span style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp; 安妮·尼维尔教授的交流，为大力推进科技创新的长安汽车提供了一个交流学习的机会，长安汽车也通过此次交流向世界展现一个正在从汽车大国迈向汽车强国应有的技术实力。</span><br style="text-align: justify;"><span style="text-align: justify;"></span><img title="1560510190912758.jpg" alt="1.jpg" src="http://www.changan.com.cn/uploads_ueditor/image/20190614/1560510190912758.jpg" _src="//www.changan.com.cn/uploads_ueditor/image/20190614/1560510190912758.jpg" style="text-align: justify;"><span style="text-align: justify;">加强国际交流，英国皇家两院院士专程分享</span></p>`
        },
        {
          id: 4,
          title: '第4次测试',
          content: `<p><span style="text-align: justify;">6月14日，英国皇家科学院院士、英国皇家工程院院士安妮·尼维尔（Anne Neville）到长安汽车进行交流，并带来了以《表面工程在下一代汽车零部件摩擦和腐蚀方面的重要性》为题的精彩分享。</span><br style="text-align: justify;"><span style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp; 安妮·尼维尔教授的交流，为大力推进科技创新的长安汽车提供了一个交流学习的机会，长安汽车也通过此次交流向世界展现一个正在从汽车大国迈向汽车强国应有的技术实力。</span><br style="text-align: justify;"><span style="text-align: justify;"></span><img title="1560510190912758.jpg" alt="1.jpg" src="http://www.changan.com.cn/uploads_ueditor/image/20190614/1560510190912758.jpg" _src="//www.changan.com.cn/uploads_ueditor/image/20190614/1560510190912758.jpg" style="text-align: justify;"><span style="text-align: justify;">加强国际交流，英国皇家两院院士专程分享</span></p>`
        },
        {
          id: 5,
          title: '第5次测试',
          content: `<p><span style="text-align: justify;">6月14日，英国皇家科学院院士、英国皇家工程院院士安妮·尼维尔（Anne Neville）到长安汽车进行交流，并带来了以《表面工程在下一代汽车零部件摩擦和腐蚀方面的重要性》为题的精彩分享。</span><br style="text-align: justify;"><span style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp; 安妮·尼维尔教授的交流，为大力推进科技创新的长安汽车提供了一个交流学习的机会，长安汽车也通过此次交流向世界展现一个正在从汽车大国迈向汽车强国应有的技术实力。</span><br style="text-align: justify;"><span style="text-align: justify;"></span><img title="1560510190912758.jpg" alt="1.jpg" src="http://www.changan.com.cn/uploads_ueditor/image/20190614/1560510190912758.jpg" _src="//www.changan.com.cn/uploads_ueditor/image/20190614/1560510190912758.jpg" style="text-align: justify;"><span style="text-align: justify;">加强国际交流，英国皇家两院院士专程分享</span></p>`
        }
      ]
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
  .bg{
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
        overflow-x: hidden;
        width:398px;
        background: #fff;
        ul{
          overflow-x: hidden;
          text-align: center;
          height: auto;
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
      }
      .right{
        height: calc(100% - 68px);
        overflow: hidden;
        width:1436px;
        background: #fff;
      }
    }
  }
</style>
