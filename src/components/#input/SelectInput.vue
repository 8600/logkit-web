<template>
  <div class="select-input">
    <div class="left">
      <span v-if="must" class="must">*</span>
      <span>{{label}}</span>
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
  created () {
    if (this.value) this.$emit('input', this.value)
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
    color: #222;
    border-color: #ccc;
    border-radius: 3px;
    padding: 0 5px;
  }
</style>