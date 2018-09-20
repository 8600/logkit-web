<template lang="pug">
  .collector-box
    Loading(v-if="loadOptionNum < 2")
    template(v-else)
      .label 收集器(runner)管理列表
      .collector
        StepsHorizontal
        .input-box
          KeyValueSelect.input-item(:value="reader.mode", @input="changeChoiceOption($event)", :option="usages", label="选择数据源类型")
          LineBar
          OptionBox(v-if="choiceOption", @change="changeConfig", :option="choiceOption")
        .bottom-bar
          Button.button-item(text="取消", @onClick="$router.go(-1)", color="#108ee9", background="")
          Button.button-item(text="下一步", @onClick="next")
</template>

<script>
import { mapState } from 'vuex'
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
      reader: {
        mode: "fileauto"
      }
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
        this.options = value.data
        // 默认选择
        this.choiceOption = value.data.fileauto
        this.loadOptionNum++
      }
    })
  },
  methods: {
    changeChoiceOption (value) {
      console.log('切换选项:', value)
      this.choiceOption = this.options[value]
      this.reader.mode = value
    },
    changeConfig (value) {
      console.log(value)
      this.reader[value.key] = value.value
    },
    next () {
      console.log(this.reader)
      this.$router.push('parser')
    }
  },
  watch: {
    choiceOption (newValue) {
      // console.log(newValue)
      this.reader = {
        mode: "fileauto",
        encoding: "UTF-8"
      }
      newValue.forEach(element => {
        if (element.Default !== '' && element.Default != undefined) {
          this.reader[element.KeyName] = element.Default
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