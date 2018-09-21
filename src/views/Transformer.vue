<template lang="pug">
  .transformer-box(v-if="usages")
    .label 创建日志收集器
    .transformer
      StepsHorizontal
      .input-box
        KeyValueSelect.input-item(v-model="type", @input="changeChoiceOption($event)", :option="usages", label="需要转化字段的类型")
        LineBar
        OptionBox(v-if="choiceOption", v-model="configData", :option="choiceOption")
      .bottom-bar
        Button.button-item(text="取消", @onClick="$router.go(-1)", color="#108ee9", background="")
        Button.button-item(text="下一步", @onClick="next()")
</template>

<script>
import { mapState } from 'vuex'
import Button from '@/components/Button_68_28.vue'
import LineBar from '@/components/LineBar.vue'
import CheckInput from '@/components/#input/CheckInput.vue'
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
    OptionBox,
    CheckInput,
    KeyValueSelect,
    StepsHorizontal
  },
  data () {
    return {
      type: '',
      map: [],
      autoDelete: false,
      options: {},
      choiceOption: [],
      configData: {},
      // 执行下一步必须包含的key列表
      mustKeyList: [],
      usages: [],
      transforms: []
    }
  },
  created () {
    // 获取支持的数据源类型
    axios.get(`${this.config.server}/logkit/transformer/usages`).then((res) => {
      let value = res.data
      console.log('获取数据源类型:', value)
      if (value.code === 'L200') {
        value.data.push({
          key: '',
          sort_key: '',
          value: '请选择需要转化的类型(若无,直接到下一步)'
        })
        this.usages = value.data
        this.loadOptionNum++
      }
    })
    axios.get(`${this.config.server}/logkit/transformer/options`).then((res) => {
      const value = res.data
      console.log('获取页面数据:', value)
      if (value.code === 'L200') {
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
      // this.parser.type = value
    },
    next () {
      // 检查必须项是否全部填写
      for (let item in this.mustKeyList) {
        const keyName = this.mustKeyList[item]
        if (this.transforms[keyName] === undefined || this.transforms[keyName] === null || this.transforms[keyName] === '') {
          alert('没有输入所有必须项!')
          return
        }
      }
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {transforms: this.transforms}
      })
      this.$router.push('sender')
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