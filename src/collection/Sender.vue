<template lang="pug">
  .transformer-box
    Loading(v-if="loadOptionNum < 2")
    template(v-else)
      .title-label
        .icon(@click="$router.push('/')") &#xe71e;
        .text 配置发送方式
      .transformer
        StepsHorizontal(:step="4")
        .input-box
          KeyValueSelect.input-item(v-model="type", @input="changeChoiceOption($event)", :option="usages", label="需要转化字段的类型")
          LineBar
          OptionBox(@change="changeConfig", :option="choiceOption")
        .bottom-bar
          Button.button-item(text="上一步", @onClick="$router.go(-1)", color="#108ee9", background="")
          Button.button-item(text="下一步", @onClick="next")
</template>

<script>
import { mapState } from 'vuex'
import Button from '@/components/Button_68_28.vue'
import LineBar from '@/components/LineBar.vue'
import Loading from '@/components/Loading.vue'
import CheckInput from '@/components/#input/CheckInput.vue'
import StepsHorizontal from '@/components/StepsHorizontal.vue'
import OptionBox from '@/components/OptionBox.vue'
import KeyValueSelect from '@/components/#input/KeyValueSelect.vue'

const axios = require('axios')
export default {
  name: 'reader',
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
    OptionBox,
    CheckInput,
    KeyValueSelect,
    StepsHorizontal
  },
  data () {
    return {
      type: 'pandora',
      map: [],
      autoDelete: false,
      options: {},
      choiceOption: [],
      configData: {},
      usages: [],
      loadOptionNum: 0,
      // 执行下一步必须包含的key列表
      mustKeyList: [],
      sender: {}
    }
  },
  created () {
    // 如果储存中有数据 载入存储中的数据
    if (this.logConfig.senders !== undefined) this.type = this.logConfig.senders[0].sender_type
    console.log(this.logConfig.senders)
    // 获取支持的数据源类型
    axios.get(`${this.config.server}/logkit/sender/usages`).then((res) => {
      const value = res.data
      console.log('获取数据源类型:', value)
      if (value.code === 'L200') {
        this.usages = value.data
        this.loadOptionNum++
      }
    })
    axios.get(`${this.config.server}/logkit/sender/options`).then((res) => {
      const value = res.data
      console.log('获取页面数据:', value)
      if (value.code === 'L200') {
        // 如果储存中有数据 载入存储中的数据
        const senders = this.logConfig.senders
        if (senders !== undefined) {
          for (let index in senders) {
            const sendersType = senders[index].sender_type
            for (let itemIndex in value.data[sendersType]) {
              const itemData = value.data[sendersType][itemIndex]
              // 如果储存项目中包含键值 则覆盖
              console.log(senders[index], itemData.KeyName)
              if (senders[index][itemData.KeyName] !== undefined) value.data[sendersType][itemIndex].Default = senders[index][itemData.KeyName]
            }
          }
        }
        this.options = value.data
        // 默认选择
        this.choiceOption = value.data.pandora
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
    next () {
      // 检查必须项是否全部填写
      for (let item in this.mustKeyList) {
        const keyName = this.mustKeyList[item]
        if (this.sender[keyName] === undefined || this.sender[keyName] === null || this.sender[keyName] === '') {
          alert('没有输入所有必须项!')
          return
        }
      }
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {senders: [this.sender]}
      })
      this.$router.push('confirm')
    },
    changeConfig (value) {
      console.log(`键值${value.key}改编为:${value.value}`)
      this.sender[value.key] = value.value
    }
  },
  watch: {
    choiceOption (newValue) {
      // console.log(newValue)
      // 清空必须字段列表
      this.mustKeyList = []
      this.sender = {
        sender_type: this.type
      }
      newValue.forEach(element => {
        // 取出所有必须输入的Key
        if (element.required) {
          this.mustKeyList.push(element.KeyName)
        }
        if (element.Default !== '' && element.Default != undefined) {
          this.sender[element.KeyName] = element.Default
        }
      })
    }
  }
}
</script>


<style scoped lang="less">
  .transformer {
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
</style>