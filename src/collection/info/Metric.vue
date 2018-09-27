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
          .check-card(v-for="(item, key) in usages", @click="cardClick(key)", :class="{active: item.Default === 'true'}")
            .icon(v-if="item.Default === 'true'") &#xe609;
            .icon(v-else) &#xe600;
            .text {{item.Description}}
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
import SelectInput from '@/components/#input/SelectInput.vue'
import StepsHorizontal from '@/components/StepsHorizontal-info.vue'
import OptionBox from '@/components/OptionBox.vue'
import KeyValueSelect from '@/components/#input/KeyValueSelect.vue'

const axios = require('axios')
export default {
  name: 'metric',
  computed: {
    ...mapState({
      metricData: state => state.metric,
      config: state => state.config
    })
  },
  components: {
    Button,
    LineBar,
    Loading,
    OptionBox,
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
        if (this.metricData.length > 0) {
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
        if (value.Default === 'true') {
          metric.push({
            type: value.KeyName,
            attributes: {},
            config: {}
          })
        }
      }
      // 这里会覆盖保存的配置
      this.$store.dispatch({
        type: 'setMetric',
        data: metric
      })
      this.$router.push('keys')
    },
    cardClick (key) {
      // 这后端我也是醉了 返回的是个字符串不是一个布尔 还需要特殊处理
      if ( this.usages[key].Default === 'false')  this.usages[key].Default = 'true'
      else this.usages[key].Default = 'false'
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
  .check-card {
    cursor: pointer;
    position: relative;
    background-color: #756d6d;
    display: flex;
    height: 60px;
    width: 280px;
    float: left;
    margin: 10px;
    color: white;
    line-height: 60px;
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
    .icon {
      width: 60px;
      text-align: center;
      font-size: 1.6rem;
    }
    .text {
      margin: 0 10px;
    }
  }
  .active {
    background-color: cornflowerblue;
  }
  .check-card:hover {
    transform: scale(1.05);
  }
</style>