<template lang="pug">
  .collector-box
    .usual-setting
      template(v-for="(item, index) in normal")
        //- TextareaInput
        SelectInput.input-item(v-if="item.Element == 'radio'", :value="item.Default", @input="changeNormalConfig(item.KeyName, $event, index)", :option="item.ChooseOptions", :label="item.Description")
        TextInput.input-item(v-else-if="item.Element == ''", :value="item.Default", @input="changeNormalConfig(item.KeyName, $event, index)", :required="item.required", :placeholder="item.placeholder", :label="item.Description")
        CheckInput.input-item(v-else-if="item.Element == 'check'", v-model="cleaner.delete_enable", :label="item.Description", :text="item.ChooseOptions")
    template(v-if="cleaner.delete_enable")
      TextInput.input-item(v-model="cleaner.delete_interval", @input="changeCleaner", :required="true", placeholder="删除执行周期", label="删除执行周期")
      TextInput.input-item(v-model="cleaner.reserve_file_number", @input="changeCleaner", :required="true", placeholder="最大保留已读文件数", label="最大保留已读文件数")
      TextInput.input-item(v-model="cleaner.reserve_file_size", @input="changeCleaner", :required="true", placeholder="最大保留已读文件总大小", label="最大保留已读文件总大小")
    //- 只有存在高级配置项目时 显示高级配置选框才有意义
    template(v-if="advance.length > 0")
      AdvanceBar(v-model="showAdvance")
      .senior-setting(v-show="showAdvance")
        template(v-for="(item, index) in advance")
          //- TextareaInput
          SelectInput.input-item(v-if="item.Element == 'radio'", :value="item.Default", @input="changeAdvanceConfig(item.KeyName, $event, index)", :option="item.ChooseOptions", :label="item.Description")
          TextInput.input-item(v-else-if="item.Element == ''", :value="item.Default", @input="changeAdvanceConfig(item.KeyName, $event, index)", :required="item.required", :placeholder="item.placeholder", :label="item.Description")
</template>

<script>
import AdvanceBar from '@/components/AdvanceBar.vue'
import TextInput from '@/components/#input/TextInput.vue'
import CheckInput from '@/components/#input/CheckInput.vue'
import SelectInput from '@/components/#input/SelectInput.vue'
import TextareaInput from '@/components/#input/TextareaInput.vue'
export default {
  props: {
    option: Array
  },
  components: {
    AdvanceBar,
    TextInput,
    CheckInput,
    SelectInput,
    TextareaInput
  },
  data () {
    return {
      cleaner: {
        delete_enable: false,
        delete_interval: "10",
        reserve_file_number: "10",
        reserve_file_size: "2048"
      },
      showAdvance: false,
      config: {},
      normal: [],
      advance: []
    }
  },
  created () {
    this.makeOption()
  },
  methods: {
    makeOption () {
      // 从配置项中取出常用配置和高级配置 提前分类好有利于提升运行效率
      const option = this.option
      let newNormal = [], newAdvance = []
      for(let item in option) {
        const value = option[item]
        if (value.advance) newAdvance.push(value)
        else newNormal.push(value)
      }
      this.normal = newNormal
      this.advance = newAdvance
    },
    changeNormalConfig (key, value, index) {
      // 数据与显示统一
      this.normal[index].Default = value
      this.$emit("change", {key, value})
    },
    changeAdvanceConfig (key, value, index) {
      // 数据与显示统一
      this.advance[index].Default = value
      this.$emit("change", {key, value})
    },
    changeCleaner () {
      const cleaner = this.cleaner
      this.$store.dispatch({
        type: 'setLogConfig',
        data: {cleaner}
      })
    }
  },
  watch: {
    option () {
      this.makeOption()
    }
  }
}
</script>

<style scoped>
.input-item {
  padding: 15px 0;
}
</style>
