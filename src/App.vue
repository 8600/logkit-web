<template lang="pug">
  .app
    router-view
</template>

<script>
const axios = require('axios')
export default {
  created () {
    axios.get('config.json').then((res) => {
      const config = res.data
      console.log('获取到配置信息:', res)
      axios.get(`${config.server}/logkit/version`).then((res) => {
        const version = res.data
        console.log('获取到版本信息:', version)
      })
      axios.get(`${config.server}/logkit/version`).then((res) => {
        const cluster = res.data
        console.log('获取到集群信息:', cluster)
      })
    })
  }
}
</script>

<style>
  /* 全局样式 */
  html, body, .app, .box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    font-family: PingFangSC-Regular;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    margin: 0;
    padding: 0;
  }
  img {
    border: 0;
    vertical-align: top;
    user-select: none;
  }
  a {
    text-decoration: none;
    color: #666;
    -webkit-user-drag: none;
  }
  a:hover {
    text-decoration: none;
  }
</style>
