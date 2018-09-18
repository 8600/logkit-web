<template>
  <div class="select-input">
    <div class="left">
      <span v-if="must" class="must">*</span>
      <span>{{label}}</span>
    </div>
    <div class="right">
      <CheckBox :value="value" @input="updateValue" :size="12" />
      <span>{{text}}</span>
    </div>
  </div>
</template>

<script>
import CheckBox from 'check-puge'
export default {
  props: {
    value: null,
    must: {
      default: false,
      type: Boolean
    },
    text: String,
    label: {
      default: '',
      type: String
    }
  },
  components: {
    CheckBox
  },
  created () {
    if (this.value) this.$emit('input', this.value)
  },
  methods: {
    updateValue (event) {
      const value = event.target.value
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