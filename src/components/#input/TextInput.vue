<template>
  <div class="text-input">
    <div class="left">
      <div class="text">
        <span v-if="must" class="must">*</span>
        <span>{{text}}</span>
      </div>
      <div class="label">{{label}}</div>
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
    must: {
      default: false,
      type: Boolean
    },
    text: String,
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
  input {
    width: calc(100% - 20px);
    height: 30px;
    border: none;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
</style>