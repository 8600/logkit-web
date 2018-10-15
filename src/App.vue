<template lang="pug">
  .app
    Loading(v-if="loading")
    router-view(v-else)
</template>

<script>
import { mapState } from 'vuex'
import Loading from '@/components/Loading.vue'
const axios = require('axios')
export default {
  computed: {
    // Getting Vuex State from store/modules/activities
    ...mapState({
      config: state => state.activities.config
    })
  },
  components: {
    Loading,
  },
  data () {
    return {
      loading: true
    }
  },
  created () {
    axios.get('config.json').then((res) => {
      let config = res.data
      console.log('获取到配置信息:', res)
      axios.get(`${config.server}/logkit/cluster/ismaster`).then((res) => {
        const cluster = res.data
        console.log('获取到集群信息:', cluster)
        config.cluster = cluster.data
        this.$store.dispatch({
          type: 'setConfig',
          data: config
        })
        this.loading = false
      })
    })
  }
}
</script>

<style lang="less">
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
  .icon {
    font-family: "iconfont";
    font-style: normal;
    font-weight: normal;
    display: inline-block;
    user-select: none;
  }
  .clear {
    clear: both;
  }
  .title-label {
    color: #595959;
    font-size: 12px;
    font-weight: 700;
    margin: 0 15px;
    padding-top: 10px;
    height: 30px;
    line-height: 30px;
    display: flex;
    .icon {
      width: 30px;
      cursor: pointer;
      font-size: 1.4rem;
      text-align: center;
      color: lightslategrey;
    }
    .text {
      margin: 0 10px;
    }
  }
  .input-item {
    width: 450px;
    font-size: 12px;
    margin: 0 auto;
    position: relative;
    padding-bottom: 10px;
    .text-bar {
      color: #423e3d;
      font-weight: bold;
      line-height: 30px;
    }
  }
  @font-face {
    font-family: 'iconfont';  /* project id 841808 */
    src: url('//at.alicdn.com/t/font_841808_m55iqavpoyk.eot');
    src: url('//at.alicdn.com/t/font_841808_m55iqavpoyk.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_841808_m55iqavpoyk.woff') format('woff'),
    url('//at.alicdn.com/t/font_841808_m55iqavpoyk.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_841808_m55iqavpoyk.svg#iconfont') format('svg');
  }
  // 滚动条样式
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: 5px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    box-shadow: inset006pxrgba(0,0,0,0.3);
    border-radius: 3px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background:skyblue;
    box-shadow: inset006pxrgba(0,0,0,0.5);
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background:skyblue;
  }
</style>
