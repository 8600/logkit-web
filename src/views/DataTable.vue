<template lang="pug">
  .data-table
    Loading(v-if="loadOptionNum < 2")
    template(v-else)
      .label 收集器(runner)管理列表
      .runner-box
        .title-bar
          router-link.title-bar-button(tag="div", to="reader")
            .icon &#xe659;
            span.text 增加日志采集收集器
          router-link.title-bar-button(tag="div", to="metric")
            .icon &#xe659;
            span.text 增加系统信息采集收集器
        .table-box
          table(v-if="tableData", border="0", cellspacing="0", cellpadding="0")
            thead
              tr
                th 名称
                th 修改时间
                th 运行状态
                th 读取总条数
                th 读取条数(条/秒)
                th 发送速率(条/s)
                th 解析成功/总 (条数)
                th 发送成功/总 (条数)
                th 路径
                th 待读取数据
                th 错误日志
                th 详细配置
                th 编辑
                th 操作
                th 重置
                th 删除
            tbody
              tr(v-for="(item, key) in tableData", :key="key")
                th {{item.name}}
                //- 创建时间
                th {{new Date(item.createtime).toLocaleString()}}
                th {{status[item.name].runningStatus === 'running' ? '运行中' : '已停止'}}
                th {{status[item.name].readDataCount}}
                //- 读取条数
                th {{parseInt(status[item.name].readspeed)}}
                th {{status[item.name].readspeed_kb}}
                th {{status[item.name].parserStats.success}} / {{status[item.name].parserStats.success + status[item.name].parserStats.errors}}
                th 
                th 
                th
                th
                  .icon &#xe699;
                //- 详细配置
                th
                  .icon(@click="showConfig = item") &#xe699;
                //- 编辑
                th
                  .icon(@click="edit(item)") &#xe67b;
                //- 操作
                th
                  // 关闭按钮
                  .icon(v-if="status[item.name].runningStatus === 'running'", @click="stop(item.name)") &#xe7fc;
                  .icon(v-else, @click="start(item.name)") &#xe686;
                th
                  // 重置
                  .icon(@click="reset(item.name)") &#xe629;
                th
                  // 删除
                  .icon(@click="deleteRunner(item.name)") &#xe61c;
          .empty(v-else)
            .icon &#xe64b;
            span 暂无数据
        .show-config-box(v-if="showConfig !== null")
          .show-config
            .title
              .text 详细配置情况
              .close.icon(@click="showConfig = null") &#xe635;
            .high-lighter
              Highlighter(v-model="showConfig")
</template>

<script>
import { mapState } from 'vuex'
import Highlighter from '@puge/highlight'
import Loading from '@/components/Loading.vue'
const axios = require('axios')
export default {
  name: 'table',
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  components: {
    Loading,
    Highlighter
  },
  data () {
    return {
      loadOptionNum: 0,
      tableData: [],
      status: {},
      showConfig: null
    }
  },
  created () {
    // 清除储存的数据
    this.$store.dispatch({
      type: 'clearLogConfig',
      data: ''
    })
    axios.get(`${this.config.server}/logkit/configs`).then((res) => {
      const value = res.data
      console.log('获取配置信息:', value)
      if (value.code === 'L200') {
        this.tableData = value.data
        this.loadOptionNum++
      }
    })
    axios.get(`${this.config.server}/logkit/status`).then((res) => {
      const value = res.data
      console.log('获取状态信息:', value)
      if (value.code === 'L200') {
        this.status = value.data
        this.loadOptionNum++
      }
    })
  },
  methods: {
    stop (name) {
      axios.post(`${this.config.server}/logkit/configs/${name}/stop`)
    },
    start (name) {
      axios.post(`${this.config.server}/logkit/configs/${name}/start`)
    },
    reset (name) {
      axios.post(`${this.config.server}/logkit/configs/${name}/reset`)
    },
    deleteRunner (name) {
      console.log(`删除${name}`)
      axios.DELETE(`${this.config.server}/logkit/configs/${name}`)
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
table {
  width: 100%;
}
.label {
  color: #595959;
  font-size: 12px;
  font-weight: 700;
  margin: 0 15px;
  padding-top: 10px;
  height: 30px;
  line-height: 30px;
}
.table-box {
  width: 100%;
  font-size: 12px;
  position: relative;
  height: calc(100% - 50px);
  thead {
    background: #f7f7f7;
    th {
      border:0;
      font-weight: 500;
      padding: 10px 0;
    }
  }
  .empty {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    height: 40px;
    color: #919191;
    line-height: 40px;
    text-align: center;
    font-size: 2em;
    .icon {
      width: 40px;
      text-align: center;
    }
  }
}
tbody {
  th {
    border-bottom: 1px solid #e9e9e9;
    .icon {
      color: blue;
      cursor: pointer;
      width: 100%;
      font-size: 0.8rem;
    }
  }
  tr {
    height: 40px;
    line-height: 40px;
    color: rgba(0,0,0,.65);
  }
}
.runner-box {
  margin: 10px;
  padding: 20px;
  background-color: white;
  width: calc(100% - 60px);
  height: calc(100% - 120px);
}
.title-bar {
  padding-bottom: 15px;
}
.title-bar-button {
  display: flex;
  line-height: 28px;
  color: #108ee9;
  width: 170px;
  cursor: pointer;
  font-size: 12px;
  margin-right: 10px;
  border: 1px solid #108ee9;
  border-radius: 5px;
  display: inline-block;
  .icon {
    width: 28px;
    text-align: center;
  }
}
.show-config-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .show-config {
    width: 80%;
    height: 80%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: white;
  }
  .title {
    line-height: 40px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .icon {
      width: 20px;
      cursor: pointer;
      text-align: center;
    }
  }
  .high-lighter {
    overflow: auto;
    height: calc(100% - 40px);
  }
}
</style>