<template>
  <div class="text-input">
    <div class="left">
      <span v-if="required" class="required">*</span>
      <span class="label">{{label}}</span>
    </div>
    <div class="right">
      <input v-model="value" :placeholder="placeholder" type="text"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    required: {
      default: false,
      type: Boolean
    },
    label: {
      default: '',
      type: String
    },
    placeholder: String
  }
}
</script>


<style scoped>
  .text-input {
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
  input {
    width: calc(100% - 10px);
    height: 28px;
    border: none;
    padding: 0 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
</style>