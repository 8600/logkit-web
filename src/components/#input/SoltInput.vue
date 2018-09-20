<template>
  <div class="solt-input">
    <div class="left">
      <span v-if="must" class="must">*</span>
      <span>{{label}}</span>
    </div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    must: {
      default: false,
      type: Boolean
    },
    label: {
      default: '',
      type: String
    }
  }
}
</script>

<style scoped>
  .solt-input {
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
    line-height: 26px;
    display: flex;
    color: rgba(0,0,0,.65);
    font-size: 12px;
  }
  textarea {
    width: 100%;
    padding: 5px;
    min-height: 180px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    color: rgba(0,0,0,.65);
  }
</style>