<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu"
                 background-color="#000"
                 text-color="#fff"
                 active-text-color="#fff"
                 @select="handleOpen"
                 :router="isRouter"
                 :default-active="$route.path"
                 >
          <el-menu-item v-for="item in items" :index="item.index" :key="item.index">
            <i class="my-icon" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
      collapse: false,
      isRouter: false,
      nowRouter: '/home/order',
      items: [
        {
          title: '前台收银',
          icon: 'reception-get-money',
          index: '/money'
        },
        // {
        //   title: '店铺状况',
        //   icon: 'shop-status',
        //   index: 'order'
        // },
        {
          title: '订单管理',
          icon: 'order-manage',
          index: '/home/order'
        },
        // {
        //   title: '营销管理',
        //   icon: 'marketing-manage',
        //   index: '/home/index'
        // },
        {
          title: '会员管理',
          icon: 'member-manage',
          index: '/home/member'
        },
        {
          title: '库存管理',
          icon: 'stock-manage',
          index: '/home/inventory'
        },
        {
          title: '统计报表',
          icon: 'statement-analysis',
          index: '/home/statement'
        },
        {
          title: '支出管理',
          icon: 'expenditure-manage',
          index: '/home/expenditure'
        }
        // {
        //   title: '系统设置',
        //   icon: 'system-setting',
        //   index: '20'
        // }
        // {
        //   icon: 'el-icon-date',
        //   index: '/21',
        //   title: '表单相关',
        //   subs: [
        //     {
        //       index: 'form',
        //       title: '基本表单'
        //     },
        //     {
        //       index: 'editor',
        //       title: '富文本编辑器'
        //     },
        //     {
        //       index: 'markdown',
        //       title: 'markdown编辑器'
        //     },
        //     {
        //       index: 'upload',
        //       title: '文件上传'
        //     }
        //   ]
        // }
      ]
    }
  },
  computed: {
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
      this.$router.push({
        path: key,
        query: {}
      })
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
    .sidebar{
      width: 268px;
      height: 100%;
      display: block;
      position: absolute;
      left: 0;
      top: 68px;
      bottom:0;
      overflow: hidden;
      ul{
        height:100%;
        width: 100%;
        li{
          width: 100%;
          height: 56px!important;
          line-height: 56px!important;
          font-size:20px;
          font-weight:400;
          color: #ffffff;
          span{
            font-size:20px!important;
            width: 100%;
          }
          &:hover{
            background-color: #06526E !important;
          }
        }
      }
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 268px;
    }
    .el-menu-item.is-active {
      background-color: #06526E !important;
    }

   .reception-get-money{
     background: url(../../assets/sidebar-icon/reception-get-money.png) center center no-repeat;
   }
    .marketing-manage{
      background: url(../../assets/sidebar-icon/marketing-manage.png) center center no-repeat;
    }
    .order-manage{
      background: url(../../assets/sidebar-icon/order-manage.png) center center no-repeat;
    }
    .shop-status{
      background: url(../../assets/sidebar-icon/shop-status.png) center center no-repeat;
    }
    .member-manage{
      background: url(../../assets/sidebar-icon/member-manage.png) center center no-repeat;
    }
    .stock-manage{
      background: url(../../assets/sidebar-icon/stock-manange.png) center center no-repeat;
    }
    .statement-analysis{
      background: url(../../assets/sidebar-icon/statement-analysis.png) center center no-repeat;
    }
    .expenditure-manage{
      background: url(../../assets/sidebar-icon/expenditure-manage.png) center center no-repeat;
    }
    .system-setting{
      background: url(../../assets/sidebar-icon/system-setting.png) center center no-repeat;
    }
    .my-icon{
      margin-right: 20px;
      height: 25px;
      width: 25px;
      display:inline-block;
      font-size: 25px;
      background-size: 25px 25px;
    }
</style>
