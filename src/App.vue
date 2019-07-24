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

<style>
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
  .my-primary-btn{
    color: #fff;
    background: #2ECAF1;
    border:1px solid #2ECAF1;
  }
  .my-secondary-btn{
    border:1px solid #2ECAF1;
    color: #2ECAF1;
    background: #FFFFFF;
  }
  .flex-space-between{
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
