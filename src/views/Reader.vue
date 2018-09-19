<template lang="pug">
  .collector-box(v-if="usages")
    .label 收集器(runner)管理列表
    .collector
      StepsHorizontal
      .input-box
        SelectInput.input-item(value="fileauto", @input="changeChoiceOption($event)", :option="usages", label="选择数据源类型")
        LineBar
        OptionBox(v-if="choiceOption", v-model="configData", :option="choiceOption")
        CheckInput.input-item(:value="autoDelete", label="是否自动删除日志文件", text="自动删除")
      .bottom-bar
        Button.button-item(text="取消", @onClick="$router.go(-1)", color="#108ee9", background="")
        Button.button-item(text="下一步", @onClick="$router.push('parser')")
</template>

<script>
import { mapState } from 'vuex'
import Button from '@/components/Button_68_28.vue'
import LineBar from '@/components/LineBar.vue'
import CheckInput from '@/components/#input/CheckInput.vue'
import StepsHorizontal from '@/components/StepsHorizontal.vue'
import OptionBox from '@/components/OptionBox.vue'
import SelectInput from '@/components/#input/SelectInput.vue'

const axios = require('axios')
export default {
  name: 'reader',
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  components: {
    Button,
    LineBar,
    OptionBox,
    CheckInput,
    SelectInput,
    StepsHorizontal
  },
  data () {
    return {
      autoDelete: false,
      options: {},
      choiceOption: [],
      configData: {},
      usages: ''
    }
  },
  created () {
    console.log(this.config)
    // 获取支持的数据源类型
    axios.get(`${this.config.server}/logkit/reader/usages`).then((res) => {
      const value = res.data
      console.log('获取数据源类型:', value)
      if (value.code === 'L200') {
        let newArr = []
        value.data.forEach(element => {
          newArr.push(element.key)
        })
        this.usages = newArr
      }
    })
    axios.get(`${this.config.server}/logkit/reader/options`).then((res) => {
      const value = res.data
      console.log('获取页面数据:', value)
      if (value.code === 'L200') {
        this.options = value.data
        // 默认选择
        this.choiceOption = value.data.fileauto
      }
    })
  },
  methods: {
    changeChoiceOption (value) {
      console.log('切换选项:', value)
      this.configData.mode = value
      this.choiceOption = this.options[value]
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