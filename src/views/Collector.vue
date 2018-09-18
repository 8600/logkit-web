<template lang="pug">
  .collector-box(v-if="usages")
    .label 收集器(runner)管理列表
    .collector
      .steps-label-horizontal
        .line
        .step-one.step-item
          .circle 1
          .text 配置数据源
        .step-two.step-item
          .circle 2
          .text 配置解析方式
        .step-three.step-item
          .circle 3
          .text 配置Transformer(非必填)
        .step-four.step-item
          .circle 4
          .text 配置发送方式
        .step-five.step-item
          .circle 5
          .text 确认并添加收集器
      .input-box
        SelectInput(value="fileauto", @input="changeChoiceOption($event)", :option="usages", label="选择数据源类型")
        .usual-setting
          template(v-for="item in choiceOption")
            template(v-if="!item.advance")
              //- TextareaInput
              SelectInput.input-item(v-if="item.Element == 'radio'", :value="item.Default", @input="changeReader(item.KeyName, $event)", :option="item.ChooseOptions", :label="item.Description")
              TextInput.input-item(v-else-if="item.Element == ''", :value="item.Default", @input="changeReader(item.KeyName, $event)", :required="item.required", :placeholder="item.placeholder", :label="item.Description")
          CheckInput(:value="false", label="是否自动删除日志文件", text="自动删除")
        .show-advance
          CheckBox(v-model="showAdvance", :size="12")
        .senior-setting(v-show="showAdvance")
          template(v-for="item in choiceOption")
            template(v-if="item.advance")
              //- TextareaInput
              SelectInput.input-item(v-if="item.Element == 'radio'", :value="item.Default", @input="changeReader(item.KeyName, $event)", :option="item.ChooseOptions", :label="item.Description")
              TextInput.input-item(v-else-if="item.Element == ''", :value="item.Default", @input="changeReader(item.KeyName, $event)", :required="item.required", :placeholder="item.placeholder", :label="item.Description")
    .bottom-bar
</template>

<script>
import { mapState } from 'vuex'
import CheckBox from 'check-puge'
import Button from '@/components/Button_68_28.vue'
import TextInput from '@/components/#input/TextInput.vue'
import CheckInput from '@/components/#input/CheckInput.vue'
import SelectInput from '@/components/#input/SelectInput.vue'
import TextareaInput from '@/components/#input/TextareaInput.vue'

const axios = require('axios')
export default {
  name: 'collector',
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  components: {
    Button,
    CheckBox,
    TextInput,
    CheckInput,
    SelectInput,
    TextareaInput
  },
  data () {
    return {
      showAdvance: false,
      checkDataType: '',
      options: {},
      choiceOption: [],
      configData: {
        reader: {
          mode: "",
          log_path: ""
        }
      },
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
        // 默认选择第一条
        this.configData.reader.mode = 0
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
    changeReader (key, value) {
      // console.log(key, value)
      this.configData.reader[key] = value
    },
    changeChoiceOption (value) {
      this.configData.reader.mode = value
      this.choiceOption = this.options[value]
      console.log(value)
    }
  }
}
</script>


<style scoped lang="less">
  .steps-label-horizontal {
    display: flex;
    padding: 30px 0;
    position: relative;
    justify-content: space-between;
  }
  .collector {
    margin: 10px;
    height: calc(100% - 130px);
    background-color: white;
    padding: 20px;
  }
  .input-box {
    height: calc(100% - 180px);
    margin: 20px;
  }
  .step-item {
    display: flex;
    height: 30px;
    line-height: 30px;
    z-index: 1;
    background-color: white;
    padding: 0 20px;
    .circle {
      width: 24px;
      text-align: center;
      height: 24px;
      line-height: 24px;
      border: 1px solid #b5b5b5;
      border-radius: 50%;
      color: #b5b5b5;
      margin: 2px;
    }
    .text {
      color: rgba(0,0,0,.43);
      margin: 0 10px;
      font-weight: 700;
      font-size: 14px;
    }
  }
  .line {
    width: 100%;
    position: absolute;
    background-color: #e9e9e9;
    height: 1px;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 0;
  }
  .label {
    color: #595959;
    font-size: 12px;
    font-weight: 700;
    margin: 0 15px;
    height: 50px;
    line-height: 50px;
  }
  .input-item {
    margin: 30px 0;
  }
</style>