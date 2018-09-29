<template lang="pug">
  .metric-box
    Loading(v-if="loadOptionNum < 1")
    template(v-else)
      .title-label
        .icon(@click="$router.push('/')") &#xe71e;
        .text 配置收集字段
      .metric
        StepsHorizontal(:step="2")
        .input-box
          template(v-for="(metricItem, metricIndex) in logConfig.metric")
            .check-all-bar
              .text {{metricItem.type}}
              CheckBox.check(v-model="checkList[metricItem.type]", @input="checkAll(metricItem.type, $event, metricIndex)", :size="11")
              span 全选/全不选
            LineBar
            .check-box
              CardInput(v-for="key in keys[metricItem.type]", v-model="metricItem.attributes[key.key]", :text="key.value")
              .clear
        .bottom-bar
          Button.button-item(text="上一步", @onClick="$router.go(-1)", color="#108ee9", background="")
          Button.button-item(text="下一步", @onClick="next")
</template>

<script>
import { mapState } from 'vuex'
import CheckBox from 'check-puge'
import LineBar from '@/components/LineBar.vue'
import Loading from '@/components/Loading.vue'
import Button from '@/components/Button_68_28.vue'
import CardInput from '@/components/#input/CardInput.vue'
import StepsHorizontal from '@/components/StepsHorizontal-info.vue'

const axios = require('axios')
export default {
  name: 'keys',
  computed: {
    ...mapState({
      logConfig: state => state.logConfig,
      config: state => state.config
    })
  },
  components: {
    Button,
    LineBar,
    Loading,
    CardInput,
    CheckBox,
    StepsHorizontal
  },
  data () {
    return {
      keys: [],
      checkList: [],
      loadOptionNum: 0
    }
  },
  created () {
    // 如果采集类型没有选择 跳转到类型选择页面
    console.log(this.logConfig)
    if (this.logConfig.metric === undefined || this.logConfig.metric.lenght === 0) this.$router.push('/metric')
    // 获取支持的数据源类型
    axios.get(`${this.config.server}/logkit/metric/keys`).then((res) => {
      const value = res.data
      console.log('获取数据源类型:', value)
      if (value.code === 'L200') {
        this.keys = value.data
        this.loadOptionNum++
      }
    })
  },
  methods: {
    next () {
      // 是否选中了至少一个采集字段
      for (let metricKey in this.logConfig.metric) {
        // 取出采集内容列表
        const metricItem = this.logConfig.metric[metricKey]
        for (let attributesKey in metricItem.attributes) {
          // 遍历所有采集字段 如果有一个字段被选中 那么就进入下一步
          if (metricItem.attributes[attributesKey]) {
            this.$router.push('option')
            return
          }
        }
      }
      console.log(this.logConfig)
      this.$alert({title: '错误', text: '没有选择需要采集的数据!'})
    },
    checkAll (name, bool, metricIndex) {
      const metricCopy = JSON.parse(JSON.stringify(this.logConfig.metric))
      // 当前选中项目所能选择的字段列表
      const keyList = this.keys[name]
      for (let item in keyList) {
        // 取出每条的key
        const key = keyList[item].key
        // 执行全选 / 全部上一步操作
        metricCopy[metricIndex].attributes[key] = bool
      }
      console.log('执行全选操作', metricCopy)
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {metric: metricCopy}
      })
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
  .check-box {
    font-size: 12px;
    padding: 0 70px;
    .clear {
      clear: both;
    }
    .check {
      margin: 4px 8px;
    }
    .check-item {
      width: 50%;
      height: 24px;
      float: left;
      line-height: 24px;
      display: flex;
      span {
        color: rgba(0,0,0,.65);
        display: inline-block;
      }
    }
  }
  .bottom-bar {
    display: flex;
    justify-content: center;
    .button-item {
      margin: 0 10px;
    }
  }
  .check-all-bar {
    font-size: 12px;
    margin-top: 15px;
    display: flex;
    line-height: 19px;
    color: rgba(0,0,0,.65);
    .check {
      margin: 0 2px;
    }
    .text {
      width: 75px;
      font-weight: bold;
    }
  }
</style>