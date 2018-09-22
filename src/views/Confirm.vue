<template lang="pug">
  .confirm-box(v-if="usages")
    .label 创建日志收集器
    .confirm
      StepsHorizontal
      .input-box
        TextInput.input-item(v-model="logConfig.name", :required="true", placeholder="收集器(runner)名称", label="名称")
        TextInput.input-item(v-model="logConfig.batch_interval", :required="true", placeholder="发送间隔单位(秒)", label="最长发送间隔")
        TextInput.input-item(v-model="logConfig.batch_size", :required="true", placeholder="发送间隔单位(秒)", label="单次读取最大数据量")
        textarea
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
import TextInput from '@/components/#input/TextInput.vue'

const axios = require('axios')
export default {
  name: 'confirm',
  computed: {
    ...mapState({
      logConfig: state => state.logConfig
    })
  },
  components: {
    Button,
    LineBar,
    OptionBox,
    CheckInput,
    TextInput,
    StepsHorizontal
  },
  data () {
    return {
      map: [],
      autoDelete: false,
      options: {},
      choiceOption: [],
      configData: {},
      usages: []
    }
  },
  methods: {
    changeChoiceOption (value) {
      console.log('切换选项:', this.map, value)
      const key = this.map[value]
      this.configData.type = key
      this.choiceOption = this.options[key]
    }
  }
}
</script>


<style scoped lang="less">
  .confirm {
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