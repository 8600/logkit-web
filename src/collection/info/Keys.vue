<template lang="pug">
  .metric-box
    Loading(v-if="loadOptionNum < 1")
    template(v-else)
      .label 创建系统信息收集器
      .metric
        StepsHorizontal(:step="1")
        .input-box
          template(v-for="(keysItem, keysName) in keys")
            .check-all-bar
              .text {{keysName}}
              CheckBox.check(:size="11")
              span 全选/全不选
            LineBar
            .check-box
              .check-item(v-for="key in keysItem")
                CheckBox.check(:size="11")
                span {{key.value}}
              .clear
        .bottom-bar
          Button.button-item(text="取消", @onClick="$router.go(-1)", color="#108ee9", background="")
          Button.button-item(text="下一步", @onClick="next")
</template>

<script>
import { mapState } from 'vuex'
import CheckBox from 'check-puge'
import LineBar from '@/components/LineBar.vue'
import Loading from '@/components/Loading.vue'
import Button from '@/components/Button_68_28.vue'
import SelectInput from '@/components/#input/SelectInput.vue'
import StepsHorizontal from '@/components/StepsHorizontal-info.vue'
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
    CheckBox,
    OptionBox,
    SelectInput,
    KeyValueSelect,
    StepsHorizontal
  },
  data () {
    return {
      autoDelete: false,
      options: {},
      choiceOption: [],
      configData: {},
      keys: [],
      loadOptionNum: 0,
      // 执行下一步必须包含的key列表
      mustKeyList: [],
      reader: {
        mode: "fileauto"
      }
    }
  },
  created () {
    // 获取支持的数据源类型
    axios.get(`${this.config.server}/logkit/metric/keys`).then((res) => {
      const value = res.data
      console.log('获取数据源类型:', value)
      if (value.code === 'L200') {
        this.keys = value.data
        this.loadOptionNum++
      }
    })
  },
  methods: {
    next () {
      this.$router.push('option')
    },
    changeMetric (value) {
      console.log(value)
    }
  }
}
</script>


<style scoped lang="less">
  .metric {
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
  .check-box {
    font-size: 12px;
    padding: 0 70px;
    .clear {
      clear: both;
    }
    .check {
      margin: 4px 8px;
    }
    .check-item {
      width: 50%;
      height: 24px;
      float: left;
      line-height: 24px;
      display: flex;
      span {
        color: rgba(0,0,0,.65);
        display: inline-block;
      }
    }
  }
  .bottom-bar {
    display: flex;
    justify-content: center;
    .button-item {
      margin: 0 10px;
    }
  }
  .check-all-bar {
    font-size: 12px;
    margin-top: 15px;
    display: flex;
    line-height: 19px;
    color: rgba(0,0,0,.65);
    .check {
      margin: 0 2px;
    }
    .text {
      width: 75px;
      font-weight: bold;
    }
  }
</style>