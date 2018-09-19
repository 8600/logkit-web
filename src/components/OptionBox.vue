<template lang="pug">
  .collector-box
    .usual-setting
      template(v-for="item in normal")
        //- TextareaInput
        SelectInput.input-item(v-if="item.Element == 'radio'", :value="item.Default", @input="changeReader(item.KeyName, $event)", :option="item.ChooseOptions", :label="item.Description")
        TextInput.input-item(v-else-if="item.Element == ''", :value="item.Default", @input="changeReader(item.KeyName, $event)", :required="item.required", :placeholder="item.placeholder", :label="item.Description")
    AdvanceBar(v-model="showAdvance")
    .senior-setting(v-show="showAdvance")
      template(v-for="item in advance")
        //- TextareaInput
        SelectInput.input-item(v-if="item.Element == 'radio'", :value="item.Default", @input="changeReader(item.KeyName, $event)", :option="item.ChooseOptions", :label="item.Description")
        TextInput.input-item(v-else-if="item.Element == ''", :value="item.Default", @input="changeReader(item.KeyName, $event)", :required="item.required", :placeholder="item.placeholder", :label="item.Description")
</template>

<script>
import AdvanceBar from '@/components/AdvanceBar.vue'
import TextInput from '@/components/#input/TextInput.vue'
import CheckInput from '@/components/#input/CheckInput.vue'
import SelectInput from '@/components/#input/SelectInput.vue'
import TextareaInput from '@/components/#input/TextareaInput.vue'
export default {
  props: {
    value: null,
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
    changeReader (key, value) {
      // console.log(key, value)
      this.config[key] = value
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
