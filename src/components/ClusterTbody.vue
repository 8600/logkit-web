<template lang="pug">
  tr
    template(v-for="(item, key) in status")
      th {{key}}
      //- 创建时间
      th {{new Date(tableData[key].createtime).toLocaleString()}}
      th {{item.runningStatus === 'running' ? '运行中' : '已停止'}}
      th {{item.readDataCount}} 条
      //- 读取条数
      th
        span {{parseInt(item.readspeed)}} 条/s
        span.icon.icon-trend(v-if="item.readspeedtrend === 'stable'") &#xe6d4;
        span.icon.icon-trend(v-else-if="item.readspeedtrend === 'up'") &#xe8ec;
        span.icon.icon-trend(v-else) &#xe917;
      th
        span {{item.readspeed_kb}} KB/s
        span.icon.icon-trend(v-if="item.readspeedtrend === 'stable'") &#xe6d4;
        span.icon.icon-trend(v-else-if="item.readspeedtrend === 'up'") &#xe8ec;
        span.icon.icon-trend(v-else) &#xe917;
      //- 读取速率
      th
        span {{getSendRate(item)}} 条/s
      //- 解析成功
      th {{item.parserStats.success}} / {{item.parserStats.success + item.parserStats.errors}} 条
      //- 发送成功
      th {{getSendData(item)}}
      th {{item.lag.size + item.lag.sizeunit}} 条
      //- 错误
      th
        .icon.icon-button &#xe699;
      //- 详细配置
      th
        .icon.icon-button(@click="showConfig = item") &#xe699;
      //- 编辑
      th
        .icon.icon-button(@click="edit(item)") &#xe67b;
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
export default {
  props: {
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
    }
  }
}
</script>