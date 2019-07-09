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
    background-color: #3DB5DB;
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
</style>
