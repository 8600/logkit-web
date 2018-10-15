<template lang="pug">
  .cluster-bar
    .cluster(v-for="(item, key) in status")
      .left
        .info.icon &#xe619;
      .right
        .name {{key}}
        .time {{new Date(tableData[key].createtime).toLocaleString()}}
        .read-box.item-bar
          .read.item
            span 读取速度: {{parseInt(item.readspeed)}} 条/s
            span.icon.icon-trend(v-if="item.readspeedtrend === 'stable'") &#xe6d4;
            span.icon.icon-trend(v-else-if="item.readspeedtrend === 'up'") &#xe8ec;
            span.icon.icon-trend(v-else) &#xe917;
          .readspeed.item
            span 读取速率: {{item.readspeed_kb}} KB/s
            span.icon.icon-trend(v-if="item.readspeedtrend === 'stable'") &#xe6d4;
            span.icon.icon-trend(v-else-if="item.readspeedtrend === 'up'") &#xe8ec;
            span.icon.icon-trend(v-else) &#xe917;
        .send-box.item-bar
          .send-speed.item 发送速率: {{getSendRate(item)}} 条/s
          .wait-send.item 等待发送: {{item.lag.size + item.lag.sizeunit}} 条
        //- 错误
        th
          .icon.icon-button &#xe699;
        //- 详细配置
        th
          .icon.icon-button(@click="$emit('showConfig', tableData[key])") &#xe699;
        //- 编辑
        th
          .icon.icon-button(@click="edit(tableData[key])") &#xe67b;
        //- 操作
        th
          // 关闭按钮
          .icon.icon-button(v-if="item.runningStatus === 'running'", @click="stop(item.name)") &#xe7fc;
          .icon.icon-button(v-else, @click="start(item.name)") &#xe686;
        th
          // 重置
          .icon.icon-button(@click="reset(item.name)") &#xe629;
        th
          // 删除
          .icon.icon-button(@click="deleteRunner(item.name)") &#xe61c;
</template>

<script>
import { mapState } from 'vuex'
const axios = require('axios')
export default {
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  props: {
    isCluster: Boolean,
    status: Object,
    tableData: Object
  },
  methods: {
    getSendData (data) {
      let success = 0, errors = 0
      for (let key in data.senderStats) {
        const value = data.senderStats[key]
        success += value.success
        errors += value.errors
      }
      // console.log(data)
      return `${success} / ${success + errors} 条`
    },
    getSendRate (data) {
      let count = 0
      for (let key in data.senderStats) {
        const value = data.senderStats[key]
        count += value.speed
      }
      return `${parseInt(count)}`
    },
    deleteRunner (name) {
      if (this.isCluster) axios.delete(`${this.config.server}/logkit/cluster/configs/${name}`)
      else axios.delete(`${this.config.server}/logkit/configs/${name}`)
    },
    stop (name) {
      this.$alert({
        text: '确定要停止采集吗',
        confirm: () => {
          if (this.isCluster) axios.post(`${this.config.server}/logkit/cluster/configs/${name}/stop`)
          else axios.post(`${this.config.server}/logkit/configs/${name}/stop`)
        }
      })
    },
    start (name) {
      if (this.isCluster) axios.post(`${this.config.server}/logkit/cluster/configs/${name}/start`)
      else axios.post(`${this.config.server}/logkit/configs/${name}/start`)
    },
    reset (name) {
      if (this.isCluster) axios.post(`${this.config.server}/logkit/cluster/configs/${name}/reset`)
      else axios.post(`${this.config.server}/logkit/configs/${name}/reset`)
    },
    edit (item) {
      console.log(item)
      this.$store.dispatch({
        type: 'setLogConfig',
        data: item
      })
      if (item.metric) {
        this.$router.push('/metric')
      } else {
        this.$router.push('/reader')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .icon-button {
    cursor: pointer;
  }
  .info {
    color: #ccc;
    font-size: 60px;
    margin: 10px;
  }
  .cluster {
    display: flex;
  }
  .name {
    font-size: 18px;
    font-weight: bold;
  }
  .item-bar {
    display: flex;
  }
</style>