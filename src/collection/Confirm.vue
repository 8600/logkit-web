<template lang="pug">
  .confirm-box(v-if="usages")
    .title-label
      .icon(@click="$router.push('/')") &#xe71e;
      .text 确认并添加收集器
    .confirm
      StepsHorizontal(:step="5")
      .input-box
        TextInput.input-item(v-model="logConfig.name", :required="true", placeholder="收集器(runner)名称", :disabled="disabled", label="名称")
        TextInput.input-item(v-model="logConfig.batch_interval", :required="true", placeholder="发送间隔单位(秒)", label="最长发送间隔")
        TextInput.input-item(v-model="logConfig.collect_interval", :required="true", placeholder="系统信息收集间隔(秒)", label="系统信息收集间隔")
        TextInput.input-item(v-model="logConfig.batch_size", :required="true", placeholder="发送间隔单位(秒)", label="单次读取最大数据量")
        CheckInput.input-item(v-model="logConfig.extra_info", label="添加额外系统信息", text="启用")
        Highlighter.high-lighter(v-model="logConfig")
      .bottom-bar
        Button.button-item(text="上一步", @onClick="$router.go(-1)", color="#108ee9", background="")
        Button.button-item(text="提交", @onClick="sendData")
</template>

<script>
import { mapState } from 'vuex'
import Button from '@/components/Button_68_28.vue'
import LineBar from '@/components/LineBar.vue'
import Highlighter from '@puge/highlight'
import CheckInput from '@/components/#input/CheckInput.vue'
import StepsHorizontal from '@/components/StepsHorizontal.vue'
import OptionBox from '@/components/OptionBox.vue'
import TextInput from '@/components/#input/TextInput.vue'

const axios = require('axios')
export default {
  name: 'confirm',
  computed: {
    ...mapState({
      config: state => state.config,
      logConfig: state => state.logConfig
    })
  },
  components: {
    Button,
    LineBar,
    OptionBox,
    CheckInput,
    TextInput,
    Highlighter,
    StepsHorizontal
  },
  data () {
    return {
      map: [],
      autoDelete: false,
      options: {},
      choiceOption: [],
      configData: {},
      usages: [],
      disabled: false
    }
  },
  created () {
    // 如果没有进程名 那么进入新建收集器
    if (this.logConfig.name !== '') {
      this.disabled = true
    } else {
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {
          name: `runner.${Date.parse(new Date())}`
        }
      })
    }
  },
  methods: {
    changeChoiceOption (value) {
      console.log('切换选项:', this.map, value)
      const key = this.map[value]
      this.configData.type = key
      this.choiceOption = this.options[key]
    },
    sendData () {
      const logConfig = this.logConfig
      if (this.disabled) {
        let requestUrl = `${this.config.server}/logkit/configs/${logConfig.name}`
        // 判断是否为集群
        if (this.config.cluster) requestUrl = `${this.config.server}/logkit/cluster/configs/${logConfig.name}`
        axios.put(requestUrl, logConfig).then((res) => {
          const value = res.data
          if (value.code === 'L200') {
            alert('修改成功!')
            this.$router.push('/')
          }
        })
      } else {
        let requestUrl = `${this.config.server}/logkit/configs/${logConfig.name}`
        // 判断是否为集群
        if (this.config.cluster) requestUrl = `${this.config.server}/logkit/cluster/configs/${logConfig.name}`
        axios.post(requestUrl, logConfig).then((res) => {
          const value = res.data
          if (value.code === 'L200') {
            this.$alert({
              title: '提示',
              text: '添加成功!'
            })
            this.$router.push('/')
          }
        })
      }
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
  .bottom-bar {
    display: flex;
    justify-content: center;
    .button-item {
      margin: 0 10px;
    }
  }
  .high-lighter {
    border: 1px solid #d9d9d9;
  }
</style>