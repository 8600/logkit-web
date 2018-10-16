<template lang="pug">
  .collector-box
    Loading(v-if="loadOptionNum < 2")
    template(v-else)
      .title-label
        .icon(@click="$router.push('/')") &#xe71e;
        .text 收集器(runner)管理列表
      .collector
        StepsHorizontal(:step="1")
        .input-box
          KeyValueSelect.input-item(v-model="logConfig.reader.mode", @input="changeChoiceOption($event)", :option="usages", label="选择数据源类型")
          // 如果可配置的项目为0 那么不显示分割线
          LineBar(v-if="choiceOption.length > 0")
          OptionBox(@change="changeConfig", :option="choiceOption")
        .bottom-bar
          Button.button-item(text="上一步", @onClick="$router.go(-1)", color="#108ee9", background="")
          Button.button-item(text="下一步", @onClick="next")
</template>

<script>
import { mapState } from 'vuex'
import { Fun } from '@/Order.js'
import LineBar from '@/components/LineBar.vue'
import Loading from '@/components/Loading.vue'
import Button from '@/components/Button_68_28.vue'
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
      mustKeyList: []
    }
  },
  created () {
    // 获取支持的数据源类型
    axios.get(`${this.config.server}/logkit/reader/usages`).then((res) => {
      const value = res.data
      console.log('获取数据源类型:', value)
      if (value.code === 'L200') {
        this.usages = value.data
        this.loadOptionNum++
      }
    })
    axios.get(`${this.config.server}/logkit/reader/options`).then((res) => {
      let value = res.data
      console.log('获取页面数据:', value)
      if (value.code === 'L200') {
        // 特殊处理
        // 允许删除日志的项目
        const allowDeleteOption = ['file', 'fileauto', 'dir', 'tailx']
        for (let item in value.data) {
          // 查找允许删除日志的项目
          if (allowDeleteOption.includes(item)) {
            value.data[item].push({
              CheckRegex: "",
              ChooseOnly: true,
              ChooseOptions: '自动删除',
              Default: false,
              DefaultNoUse: true,
              Description: "是否自动删除日志文件(delete_enable)",
              Element: "check",
              KeyName: "delete_enable",
              Secret: false,
              placeholder: null,
              required: false,
              style: "",
              tooltip: ""
            })
          }
        }
        // 如果储存中有数据 载入存储中的数据
        const reader = this.logConfig.reader
        if (reader !== undefined) {
          console.log('从储存中加载数据!')
          const readerMode = reader.mode
          for (let itemIndex in value.data[readerMode]) {
            const itemData = value.data[readerMode][itemIndex]
            // 如果储存项目中包含键值 则覆盖
            // console.log(reader, itemData.KeyName)
            if (reader[itemData.KeyName] !== undefined) value.data[readerMode][itemIndex].Default = reader[itemData.KeyName]
          }
        } else {
          // 如果配置项中reader不存在 那么初始化
          this.$store.dispatch({
            type: 'setLogConfig',
            data: {
              reader: {
                mode: "fileauto"
              }
            }
          })
        }
        this.options = value.data
        // 默认选择
        this.choiceOption = value.data[this.logConfig.reader.mode]
        this.loadOptionNum++
      }
    })
  },
  methods: {
    changeChoiceOption (value) {
      console.log('切换选项:', value)
      this.choiceOption = this.options[value]
    },
    changeConfig (value) {
      let readerCopy = Fun.deepClone(this.logConfig.reader)
      console.log(`键值${value.key}改编为:${value.value}`)
      readerCopy[value.key] = value.value
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {reader: readerCopy}
      })
    },
    next () {
      let readerCopy = Fun.deepClone(this.logConfig.reader)
      // 检查必须项是否全部填写
      for (let item in this.mustKeyList) {
        const keyName = this.mustKeyList[item]
        if (readerCopy[keyName] === undefined || readerCopy[keyName] === null || readerCopy[keyName] === '') {
          this.$alert({title: '错误', text: `没有输入所有必须项:${keyName}`})
          return
        }
      }
      this.$router.push('/parser')
    }
  },
  watch: {
    choiceOption (newValue) {
      // console.log(newValue)
      // 清空必须字段列表
      this.mustKeyList = []
      let readerCopy = {
        mode: 'fileauto'
      }
      newValue.forEach(element => {
        // 取出所有必须输入的Key
        if (element.required) {
          this.mustKeyList.push(element.KeyName)
        }
        if (element.Default) {
          // 判断store中是否有数据
          if (this.logConfig.reader && this.logConfig.reader.mode) {
            console.log(`从reader中读取到mode:${this.logConfig.reader.mode}`)
            readerCopy.mode = this.logConfig.reader.mode
          }
          readerCopy[element.KeyName] = element.Default
        }
        // console.log(element)
      })
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {reader: readerCopy}
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
</style>