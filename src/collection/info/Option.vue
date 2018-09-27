<template lang="pug">
  .metric-option-box
    Loading(v-if="loadOptionNum < 1")
    template(v-else)
      .label 创建系统信息收集器
      .metric-option
        StepsHorizontal(:step="3")
        .input-box
          template(v-for="metricItem in metric")
            // 如果配置项列表为空则不显示
            template(v-if="usages[metricItem.type].length > 0")
              LineBar
              template(v-for="item in usages[metricItem.type]")
                SelectInput.input-item(v-if="item.Element == 'radio'", v-model="item.Default", :option="item.ChooseOptions", :label="item.Description")
                TextInput.input-item(v-else, v-model="item.Default", :required="item.required", :placeholder="item.placeholder", :label="item.Description")
        .bottom-bar
          Button.button-item(text="取消", @onClick="$router.go(-1)", color="#108ee9", background="")
          Button.button-item(text="下一步", @onClick="next")
</template>

<script>
import { mapState } from 'vuex'
import LineBar from '@/components/LineBar.vue'
import Loading from '@/components/Loading.vue'
import Button from '@/components/Button_68_28.vue'
import TextInput from '@/components/#input/TextInput.vue'
import SelectInput from '@/components/#input/SelectInput.vue'
import StepsHorizontal from '@/components/StepsHorizontal-info.vue'
import OptionBox from '@/components/OptionBox.vue'
import KeyValueSelect from '@/components/#input/KeyValueSelect.vue'

const axios = require('axios')
export default {
  name: 'reader',
  computed: {
    ...mapState({
      logConfig: state => state.logConfig,
      metric: state => state.metric,
      config: state => state.config
    })
  },
  components: {
    Button,
    LineBar,
    Loading,
    OptionBox,
    TextInput,
    SelectInput,
    KeyValueSelect,
    StepsHorizontal
  },
  data () {
    return {
      autoDelete: false,
      options: {},
      choiceOption: [],
      configData: {},
      usages: [],
      loadOptionNum: 0,
      // 执行下一步必须包含的key列表
      mustKeyList: [],
      reader: {
        mode: "fileauto"
      }
    }
  },
  created () {
    // 获取支持的数据源类型
    axios.get(`${this.config.server}/logkit/metric/options`).then((res) => {
      const value = res.data
      console.log('获取数据源类型:', value)
      if (value.code === 'L200') {
        // 如果是修改 则从存储中取出数据
        for (let index in this.logConfig.metric) {
          const storeValue = this.logConfig.metric[index]
          for (let metricDataIndex in value.data[storeValue.type]) {
            const metricValue = value.data[storeValue.type][metricDataIndex]
            if (storeValue.config[metricValue.KeyName]) value.data[storeValue.type][metricDataIndex].Default = 'true'
            else value.data[storeValue.type][metricDataIndex].Default = 'false'
          }
        }
        this.usages = value.data
        this.loadOptionNum++
      }
    })
  },
  methods: {
    next () {
      let metricCopy = JSON.parse(JSON.stringify(this.metric))
      for (let index in metricCopy) {
        // 找到usages中对应的数据列表
        const data = this.usages[metricCopy[index].type]
        // metricCopy[index].config[]
        data.forEach(element => {
          // 待优化 后端返回的有问题 
          if (element.Default !== '') metricCopy[index].config[element.KeyName] = element.Default === 'true' ? true : false
        })
      }
      console.log(metricCopy)
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {metric: metricCopy}
      })
      this.$router.push('sender')
    }
  }
}
</script>


<style scoped lang="less">
  .metric-option {
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