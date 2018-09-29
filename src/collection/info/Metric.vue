<template lang="pug">
  .metric-box
    Loading(v-if="loadOptionNum < 1")
    template(v-else)
      .title-label
        .icon(@click="$router.push('/')") &#xe71e;
        .text 系统信息选择
      .metric
        StepsHorizontal(:step="1")
        .input-box
          CardInput(v-for="(item, key) in usages", :text="item.Description", v-model="usages[key].Default")
          .clear
        .bottom-bar
          Button.button-item(text="上一步", @onClick="$router.go(-1)", color="#108ee9", background="")
          Button.button-item(text="下一步", @onClick="next")
</template>

<script>
import { mapState } from 'vuex'
import LineBar from '@/components/LineBar.vue'
import Loading from '@/components/Loading.vue'
import Button from '@/components/Button_68_28.vue'
import CardInput from '@/components/#input/CardInput.vue'
import SelectInput from '@/components/#input/SelectInput.vue'
import StepsHorizontal from '@/components/StepsHorizontal-info.vue'
import OptionBox from '@/components/OptionBox.vue'
import KeyValueSelect from '@/components/#input/KeyValueSelect.vue'

const axios = require('axios')
export default {
  name: 'metric',
  computed: {
    ...mapState({
      metricData: state => state.logConfig.metric,
      config: state => state.config
    })
  },
  components: {
    Button,
    LineBar,
    Loading,
    OptionBox,
    CardInput,
    SelectInput,
    KeyValueSelect,
    StepsHorizontal
  },
  data () {
    return {
      usages: [],
      loadOptionNum: 0,
      metric: {}
    }
  },
  created () {
    // 获取支持的数据源类型
    axios.get(`${this.config.server}/logkit/metric/usages`).then((res) => {
      const value = res.data
      console.log('获取数据源类型:', value)
      // 待优化 后端返回更方便
      if (value.code === 'L200') {
        // 如果metricData有数据 那么是修改模式
        // console.log(this.metricData)
        if (this.metricData !== undefined && this.metricData.length > 0) {
          // 循环每一条内容
          for (let key in value.data) {
            // 将储存中找不到的项目的值设置为false
            if (!this.metricData.find((element) => (element.type == value.data[key].KeyName))) {
              value.data[key].Default = 'false'
            }
          }
        }
        this.usages = value.data
        this.loadOptionNum++
      }
    })
  },
  methods: {
    next () {
      let metric = []
      // 待优化 可以合并
      for(let item in this.usages) {
        const value = this.usages[item]
        if (value.Default) {
          metric.push({
            type: value.KeyName,
            attributes: {},
            config: {}
          })
        }
      }
      // 如果没有选择需要采集的数据 不向下执行
      if (metric.length === 0) {
        this.$alert({title: '错误', text: '没有选择需要采集的数据!'})
        return
      }
      // 这里会覆盖保存的配置
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {metric: metric}
      })
      this.$router.push('keys')
    }
  }
}
</script>


<style scoped lang="less">
  .metric {
    margin: 10px;
    height: calc(100% - 120px);
    background-color: white;
    padding: 20px;
  }
  .input-box {
    height: calc(100% - 160px);
    margin: 20px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .bottom-bar {
    display: flex;
    justify-content: center;
    .button-item {
      margin: 0 10px;
    }
  }
  
</style>