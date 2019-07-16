<template>
    <div class="wrapper bg-blue">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
export default {
  data () {
    return {
      collapse: false
    }
  },
  components: {
    vHead, vSidebar
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  .content-box{
    position: absolute;
    left: 268px;
    top: 68px;
    width:calc(100vw - 268px);
    height:calc(100vh - 68px);
    margin: auto;
    overflow: hidden;
    .content{
      padding: 20px;
      overflow: hidden;
      width:1530px;
      height:828px;
      background:rgba(255,255,255,1);
      border-radius:10px;
      position: relative;
      top: 50%;
      margin-top: -434px;
      left: 50%;
      margin-left: -786px;
    }
  }
</style>
