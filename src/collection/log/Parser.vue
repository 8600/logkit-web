<template lang="pug">
  .collector-box
    Loading(v-if="loadOptionNum < 3")
    template(v-else)
      .title-label
        .icon(@click="$router.push('/')") &#xe71e;
        .text 收集器(runner)管理列表
      .collector
        StepsHorizontal(:step="2")
        .input-box
          KeyValueSelect.input-item(:value="parser.type", @input="changeChoiceOption($event)", :option="usages", label="选择数据源类型")
          // 如果可配置的项目为0 那么不显示分割线
          LineBar(v-if="choiceOption.length > 0")
          OptionBox(@change="changeConfig", :option="choiceOption")
          SoltInput.input-item(label="输入样例日志")
            textarea.highlight(v-model="choiceSample")
            .analysis-button(@click="analysisData") 解析样例数据
          SoltInput.input-item(label="样例日志")
            Highlighter.highlight(v-model="samplePoints")
        .bottom-bar
          Button.button-item(text="上一步", @onClick="$router.go(-1)", color="#108ee9", background="")
          Button.button-item(text="下一步", @onClick="next()")
</template>

<script>
import { mapState } from 'vuex'
import Button from '@/components/Button_68_28.vue'
import LineBar from '@/components/LineBar.vue'
import Loading from '@/components/Loading.vue'
import Highlighter from '@puge/highlight'
import SoltInput from '@/components/#input/SoltInput.vue'
import StepsHorizontal from '@/components/StepsHorizontal.vue'
import OptionBox from '@/components/OptionBox.vue'
import KeyValueSelect from '@/components/#input/KeyValueSelect.vue'

const axios = require('axios')
export default {
  name: 'parser',
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
    SoltInput,
    OptionBox,
    Highlighter,
    KeyValueSelect,
    StepsHorizontal
  },
  data () {
    return {
      type: 'raw',
      options: {},
      choiceOption: [],
      samplelogs: {},
      choiceSample: '',
      usages: '',
      loadOptionNum: 0,
      samplePoints: {},
      // 执行下一步必须包含的key列表
      mustKeyList: [],
      parser: {}
    }
  },
  created () {
    // 获取支持的数据源类型
    axios.get(`${this.config.server}/logkit/parser/usages`).then((res) => {
      const value = res.data
      console.log('获取数据源类型:', value)
      if (value.code === 'L200') {
        this.usages = value.data
        this.loadOptionNum++
      }
    })
    axios.get(`${this.config.server}/logkit/parser/options`).then((res) => {
      const value = res.data
      console.log('获取页面数据:', value)
      if (value.code === 'L200') {
        // 如果储存中有数据 载入存储中的数据
        const parser = this.logConfig.parser
        if (parser !== undefined) {
          const parserMode = parser.type
          for (let itemIndex in value.data[parserMode]) {
            const itemData = value.data[parserMode][itemIndex]
            // 如果储存项目中包含键值 则覆盖
            // console.log(parser, itemData.KeyName)
            if (parser[itemData.KeyName] !== undefined) value.data[parserMode][itemIndex].Default = parser[itemData.KeyName]
          }
          this.parser.type = parser.type
        }
        this.options = value.data
        // 默认选择
        this.choiceOption = value.data.raw
        this.loadOptionNum++
      }
    })
    axios.get(`${this.config.server}/logkit/parser/samplelogs`).then((res) => {
      const value = res.data
      console.log('获取样例数据', value)
      if (value.code === 'L200') {
        this.samplelogs = value.data
        // 默认选择 raw
        this.choiceSample = value.data.raw
        this.loadOptionNum++
      }
    })
  },
  methods: {
    changeChoiceOption (value) {
      console.log('切换选项:', value)
      this.type = value
      this.choiceOption = this.options[value]
    },
    changeConfig (value) {
      console.log(`键值${value.key}改编为:${value.value}`)
      this.parser[value.key] = value.value
    },
    next () {
      // 检查必须项是否全部填写
      for (let item in this.mustKeyList) {
        const keyName = this.mustKeyList[item]
        if (this.parser[keyName] === undefined || this.parser[keyName] === null || this.parser[keyName] === '') {
          this.$alert({title: '错误', text: `没有输入所有必须项:${keyName}`})
          return
        }
      }
      console.log(this.parser)
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {parser: this.parser}
      })
      this.$router.push('transformer')
    },
    analysisData () {
      let sendData = this.parser
      // 填充选中的样例数据
      sendData.sampleLog = this.choiceSample
      axios.post(`${this.config.server}/logkit/parser/parse`, sendData).then((res) => {
        const value = res.data
        console.log(value)
        if (value.code === 'L200') {
          this.samplePoints = value.data.SamplePoints[0]
        }
      })
    }
  },
  watch: {
    choiceOption (newValue) {
      // console.log(newValue)
      // 清空必须字段列表
      this.mustKeyList = []
      this.parser = {
        type: this.type
      }
      newValue.forEach(element => {
        // 取出所有必须输入的Key
        if (element.required) {
          this.mustKeyList.push(element.KeyName)
        }
        if (element.Default !== '' && element.Default != undefined) {
          this.parser[element.KeyName] = element.Default
        }
      })
    }
  }
}
</script>


<style scoped lang="less">
  .collector {
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
  .analysis-button {
    position: absolute;
    border-color: #bfd8f7;
    color: #108ee9;
    cursor: pointer;
    background-color: #f1f7fe;
    right: -80px;
    border-radius: 5px;
    padding: 0 5px;
  }
  .highlight {
    min-height: 200px;
    border: 1px solid #ccc;
    padding: 5px;
    width: 100%;
  }
</style>