<template lang="pug">
  .metric-box
    Loading(v-if="loadOptionNum < 1")
    template(v-else)
      .label 创建系统信息收集器
      .metric
        StepsHorizontal(:step="1")
        .input-box
          template(v-for="item in usages")
            SelectInput.input-item(v-model="item.Default", :option="item.ChooseOptions", :label="item.Description")
        .bottom-bar
          Button.button-item(text="取消", @onClick="$router.go(-1)", color="#108ee9", background="")
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
      if (value.code === 'L200') {
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
      this.$store.dispatch({
        type: 'setMetric',
        data: metric
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
  .input-item {
    padding: 15px 0;
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
  .bottom-bar {
    display: flex;
    justify-content: center;
    .button-item {
      margin: 0 10px;
    }
  }
</style>