<template lang="pug">
  .transformer-box
    Loading(v-if="loadOptionNum < 2")
    template(v-else)
      .label 创建日志收集器
      .transformer
        StepsHorizontal(:step="3")
        .input-box
          KeyValueSelect.input-item(v-model="type", @input="changeChoiceOption($event)", :option="usages", label="需要转化字段的类型")
          // 如果没有选择类型就不应该显示分割线
          LineBar(v-if="type !== ''")
          .transforms-list
            .transforms-item(v-for="item in transforms") {{item.type}}
          OptionBox(v-if="choiceOption", @change="changeConfig", :option="choiceOption")
          // 如果没有选择类型就不应该显示添加按钮
          .add-button(v-if="type !== ''", @click="addTransformer") 添加
        .bottom-bar
          Button.button-item(text="取消", @onClick="$router.go(-1)", color="#108ee9", background="")
          Button.button-item(text="下一步", @onClick="next()")
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
  name: 'transformer',
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
    CheckInput,
    KeyValueSelect,
    StepsHorizontal
  },
  data () {
    return {
      type: '',
      loadOptionNum: 0,
      options: {},
      choiceOption: [],
      // 执行下一步必须包含的key列表
      mustKeyList: [],
      usages: [],
      newTransformsData: {},
      transforms: []
    }
  },
  created () {
    // 获取支持的数据源类型
    axios.get(`${this.config.server}/logkit/transformer/usages`).then((res) => {
      let value = res.data
      console.log('获取数据源类型:', value)
      if (value.code === 'L200') {
        value.data.unshift({
          key: '',
          sort_key: '',
          value: '请选择需要转化的类型(若无,直接到下一步)'
        })
        this.usages = value.data
        this.loadOptionNum++
      }
    })
    axios.get(`${this.config.server}/logkit/transformer/options`).then((res) => {
      let value = res.data
      console.log('获取页面数据:', value)
      if (value.code === 'L200') {
        this.options = value.data
        this.loadOptionNum++
      }
    })
  },
  methods: {
    changeChoiceOption (value) {
      console.log('切换选项:', value)
      if (value !== '') {
        this.choiceOption = this.options[value]
      } else {
        this.choiceOption = []
      }
    },
    next () {
      // 如果用户没有选择了项目但是没有添加 则向用户发出提示
      if (this.type !== '' && this.transforms.length === 0) {
        alert('当前选择的transformer还未添加')
        return
      }
      this.$router.push('sender')
    },
    addTransformer () {
      console.log(this.newTransformsData)
      // 检查必须项是否全部填写
      for (let item in this.mustKeyList) {
        const keyName = this.mustKeyList[item]
        if (this.newTransformsData[keyName] === undefined || this.newTransformsData[keyName] === null || this.newTransformsData[keyName] === '') {
          alert('没有输入所有必须项!')
          return
        }
      }
      // 添加newTransformsData
      this.transforms.push(this.newTransformsData)
      // 更新到store
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {transforms: this.transforms}
      })
      // 回收newTransformsData变量
      this.newTransformsData = {}
    },
    changeConfig (value) {
      console.log(`键值${value.key}改编为:${value.value}`)
      this.newTransformsData[value.key] = value.value
    }
  },
  watch: {
    choiceOption (newValue) {
      // console.log(newValue)
      // 清空必须字段列表
      this.mustKeyList = []
      this.newTransformsData = {
        type: this.type
      }
      console.log(newValue)
      newValue.forEach(element => {
        // 取出所有必须输入的Key
        if (element.required) {
          this.mustKeyList.push(element.KeyName)
        }
        if (element.Default !== '' && element.Default != undefined) {
          this.newTransformsData[element.KeyName] = element.Default
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