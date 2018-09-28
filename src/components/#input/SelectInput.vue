<template>
  <div class="select-input">
    <div class="text-bar">
      <span v-if="must" class="must">*</span>
      <span>{{label}}:</span>
    </div>
    <div class="right">
      <select :value="value" @change="updateValue">
        <option v-for="(item, ind) in option" :value="item" :key="ind">{{item}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    option: Array,
    must: {
      default: false,
      type: Boolean
    },
    label: {
      default: '',
      type: String
    }
  },
  methods: {
    updateValue (event) {
      const value = event.target.value
      // 如果文本框中没有数值 则不做修改
      if (!value) {
        event.target.value = this.value
        event.preventDefault()
        return
      }
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
  .right {
    width: 400px;
  }
  select {
    width: 100%;
    height: 30px;
    color: #222;
    border-color: #ccc;
    border-radius: 3px;
    padding: 0 5px;
    background-color: whitesmoke;
  }
</style>