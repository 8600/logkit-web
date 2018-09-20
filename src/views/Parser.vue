<template lang="pug">
  .collector-box
    Loading(v-if="loadOptionNum < 3")
    template(v-else)
      .label 收集器(runner)管理列表
      .collector
        StepsHorizontal
        .input-box
          KeyValueSelect.input-item(:value="parser.type", @input="changeChoiceOption($event)", :option="usages", label="选择数据源类型")
          LineBar
          OptionBox(v-if="choiceOption", v-model="configData", :option="choiceOption")
          SoltInput.input-item(label="输入样例日志")
            textarea(v-model="choiceSample")
          SoltInput.input-item(label="样例日志")
            textarea
        .bottom-bar
          Button.button-item(text="取消", @onClick="$router.go(-1)", color="#108ee9", background="")
          Button.button-item(text="下一步", @onClick="next()")
</template>

<script>
import { mapState } from 'vuex'
import Button from '@/components/Button_68_28.vue'
import LineBar from '@/components/LineBar.vue'
import Loading from '@/components/Loading.vue'
import SoltInput from '@/components/#input/SoltInput.vue'
import StepsHorizontal from '@/components/StepsHorizontal.vue'
import OptionBox from '@/components/OptionBox.vue'
import KeyValueSelect from '@/components/#input/KeyValueSelect.vue'

const axios = require('axios')
export default {
  name: 'parser',
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  components: {
    Button,
    LineBar,
    Loading,
    SoltInput,
    OptionBox,
    KeyValueSelect,
    StepsHorizontal
  },
  data () {
    return {
      options: {},
      choiceOption: [],
      configData: {},
      samplelogs: {},
      choiceSample: '',
      usages: '',
      loadOptionNum: 0,
      parser: {
        type: 'raw'
      }
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
      this.choiceOption = this.options[value]
      this.parser.type = value
    },
    next () {
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {parser: this.parser}
      })
      this.$router.push('transformer')
    }
  },
  watch: {
    choiceOption (newValue) {
      // console.log(newValue)
      this.parser = {
        type: "raw"
      }
      newValue.forEach(element => {
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