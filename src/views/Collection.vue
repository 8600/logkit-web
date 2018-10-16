<template lang="pug">
  .data-table
    Loading(v-if="loadOptionNum < 1")
    template(v-else)
      .label 收集器(runner)管理列表
      .runner-box
        .title-bar
        .table-box
          .cluster-box(v-if="tableData", border="0", cellspacing="0", cellpadding="0")
            //- 集群模式
            .cluster(v-if="config.cluster")
              template(v-for="(clusterItem, clusterKey) in status")
                .cluster-title-bar
                  .tag 集群名称: {{clusterItem.tag}}
                  .url 网络地址: {{clusterKey}}
                  .add-button-box
                    router-link.title-bar-button(tag="div", to="reader")
                      .icon &#xe659;
                      span.text 增加日志采集器
                    router-link.title-bar-button(tag="div", to="metric")
                      .icon &#xe659;
                      span.text 增加系统采集器
                ClusterTbody(:status="clusterItem.status", :isCluster="true", :tableData="tableData[clusterKey].configs", @showConfig="(data) => showConfig = data")
            //- 普通模式
            .cluster(v-else)
              router-link.title-bar-button(tag="div", to="reader")
                .icon &#xe659;
                span.text 增加日志采集器
              router-link.title-bar-button(tag="div", to="metric")
                .icon &#xe659;
                span.text 增加系统采集器
              ClusterTbody(:status="status", :isCluster="false", :tableData="tableData", @showConfig="(data) => showConfig = data")
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
import ClusterTbody from '@/components/ClusterTbody.vue'
import Loading from '@/components/Loading.vue'
const axios = require('axios')
export default {
  name: 'data-table',
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  components: {
    Loading,
    Highlighter,
    ClusterTbody
  },
  data () {
    return {
      loadOptionNum: 0,
      tableData: [],
      status: {},
      showConfig: null,
      // 定时器
      clock: null,
      // 集群
      tag: '',
      url: ''
    }
  },
  created () {
    // 清除储存的数据
    this.$store.dispatch({
      type: 'clearLogConfig',
      data: ''
    })
    let configsUrl = `${this.config.server}/logkit/configs`
    // 判断是否为集群模式
    if (this.config.cluster) {
      configsUrl = `${this.config.server}/logkit/cluster/configs?tag=${this.tag}&url=${this.url}`
    }
    axios.get(configsUrl).then((res) => {
      const value = res.data
      console.log('获取配置信息:', value)
      if (value.code === 'L200') {
        this.tableData = value.data
        this.loadOptionNum++
      }
    })
    this.getStatusData()
  },
  methods: {
    getStatusData () {
      let statusUrl = `${this.config.server}/logkit/status`
      // 判断是否为集群模式
      if (this.config.cluster) {
        statusUrl = `${this.config.server}/logkit/cluster/status?tag=${this.tag}&url=${this.url}`
      }
      axios.get(statusUrl).then((res) => {
        const value = res.data
        // console.log('获取状态信息:', value)
        if (value.code === 'L200') {
          this.status = value.data
        }
        this.clock = setTimeout(() => {
          // console.log(this)
          if (this.$route.name === 'collection') {
            this.getStatusData()
          }
        }, 2000)
      })
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
    .icon-button {
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
  .icon-trend {
    color: skyblue;
    font-size: 14px;
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
.cluster-title-bar {
  display: flex;
  line-height: 40px;
  color: white;
  font-size: 15px;
  padding: 0 10px;
  background-color: cornflowerblue;
}
.cluster-title-bar .url {
  margin: 0 10px;
}
.add-button-box {
  position: absolute;
  right: 0;
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
  background-color: white;
  .icon {
    width: 28px;
    text-align: center;
  }
}
.cluster-box {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
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