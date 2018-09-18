<template lang="pug">
  .collector(v-if="usages")
    .steps-label-horizontal
      .step-one.step-item
        .circle 1
        .text 配置数据源
      .line
      .step-two.step-item
        .circle 2
        .text 配置解析方式
      .line
      .step-three.step-item
        .circle 3
        .text 配置Transformer(非必填)
      .line
      .step-four.step-item
        .circle 4
        .text 配置发送方式
      .line
      .step-five.step-item
        .circle 5
        .text 确认并添加收集器
    SelectInput(v-model="configData.reader.mode", :option="usages", text="sdsd", label="sdsdsd", :must="true", nameKey="value", valueKey="key")
    TextareaInput
    TextInput(:must="true", value="sd", placeholder="sdsdsdsd", text="sdsd", label="sdsdsd")
</template>

<script>
import { mapState } from 'vuex'
import TextInput from '@/components/#input/TextInput.vue'
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
    TextInput,
    SelectInput,
    TextareaInput
  },
  data () {
    return {
      checkDataType: '',
      configData: {
        reader: {
          mode: ""
        }
      },
      usages: ''
    }
  },
  mounted () {
    console.log(this.config)
    // 获取支持的数据源类型
    axios.get(`${this.config.server}/logkit/reader/usages`).then((res) => {
      const value = res.data
      console.log('获取数据源类型:', value)
      if (value.code === 'L200') {
        this.usages = value.data
        // 默认选择第一条
        this.configData.reader.mode = value.data[0].key
      }
    })
  }
}
</script>


<style scoped lang="less">
  .steps-label-horizontal {
    display: flex;
    justify-content: space-between;
  }
  .step-item {
    display: flex;
    height: 30px;
    line-height: 30px;
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
      margin: 0 10px;
    }
  }
</style>