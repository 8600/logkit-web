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
      const config = res.data
      this.$store.dispatch({
        type: 'setConfig',
        data: config
      })
      console.log('获取到配置信息:', res)
      axios.get(`${config.server}/logkit/version`).then((res) => {
        const version = res.data
        console.log('获取到版本信息:', version)
      })
      axios.get(`${config.server}/logkit/version`).then((res) => {
        const cluster = res.data
        console.log('获取到集群信息:', cluster)
      })
      this.loading = false
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
  .icon {
    font-family: "iconfont";
    font-style: normal;
    font-weight: normal;
    display: inline-block;
    user-select: none;
  }
  @font-face {
    font-family: 'iconfont';  /* project id 841808 */
    src: url('//at.alicdn.com/t/font_841808_7b1jtdcav5h.eot');
    src: url('//at.alicdn.com/t/font_841808_7b1jtdcav5h.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_841808_7b1jtdcav5h.woff') format('woff'),
    url('//at.alicdn.com/t/font_841808_7b1jtdcav5h.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_841808_7b1jtdcav5h.svg#iconfont') format('svg');
  }
</style>
