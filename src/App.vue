<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body,
  #app,
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  body {
    font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
  }
  a {
    text-decoration: none
  }
  .font-red {
    color: #F83D3D;
  }
  .font-blue {
    color: rgba(46, 202, 241, 1);
  }
  .bg-blue {
    background:#a6c9e2;
  }
  .float-left {
    float: left;
  }
  .float-right {
    float: right;
  }
  .clear-both {
    clear: both;
  }
  .overflow-row1-ellipsis{
    white-space:nowrap;/*规定段落中的文本不进行换行*/
    overflow:hidden;/*内容会被修剪，并且其余内容是不可见的。*/
    text-overflow:ellipsis;/*显示省略号来代表被修剪的文本*/
  }
  .overflow-row2-ellipsis{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow:ellipsis;/*显示省略号来代表被修剪的文本*/
  }
  .overflow-row3-ellipsis{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow:ellipsis;/*显示省略号来代表被修剪的文本*/
  }
  .my-btn{
    background:rgba(255,255,255,1)!important;
    border:1px solid rgba(46,202,241,1)!important;
    background:#fff!important;
    outline: none!important;
    color:rgba(46,202,241,1)!important;
    &:active{
      background:#bee7f6!important;
    }
  }
  .my-btn-active {
    outline: none!important;
    border: 1px solid #2DC2F3!important;
    background:#2DC2F3!important;
    color:#fff!important;
    &:active{
      background:#09b7f0!important;
    }
  }
  .flex-space-between{
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
