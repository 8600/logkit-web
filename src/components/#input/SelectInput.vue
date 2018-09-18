<template>
  <div class="select-input">
    <div class="left">
      <div class="text">
        <span v-if="must" class="must">*</span>
        <span>{{text}}</span>
      </div>
      <div class="label">{{label}}</div>
    </div>
    <div class="right">
      <select :value="value" @change="">
        <option v-for="(item, ind) in option" :value="item[valueKey]" :key="ind">{{item[nameKey]}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    nameKey: String,
    valueKey: String,
    text: String,
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
  .select-input {
    display: flex;
    margin: 20px 0;
    justify-content: center;
  }
  .left {
    font-size: 12px;
    width: 200px;
    text-align: right;
    margin: 0 20px;
  }
  .text {
    color: #000;
  }
  .label {
    color: rgba(0, 0, 0, 0.43);
  }
  .right {
    width: 400px;
    margin: 0 20px;
  }
  select {
    width: 100%;
    height: 30px;
    border-color: #ccc;
    border-radius: 3px;
  }
</style>