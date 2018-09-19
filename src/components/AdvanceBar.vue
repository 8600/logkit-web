<template lang="pug">
  .show-advance-box
    .show-advance
      CheckBox(class="check-box", :value="value", @input="$emit('input', $event)", :size="11")
      span 高级选项
    .dotted-line
</template>

<script>
import CheckBox from 'check-puge'
export default {
  props: {
    value: null
  },
  components: {
    CheckBox
  }
}
</script>

<style scoped lang="less">
  .show-advance-box {
    position: relative;
    display: flex;
    padding: 25px 0;
    font-size: 12px;
    color: rgba(0,0,0,.85);
    .show-advance {
      z-index: 1;
      display: flex;
      line-height: 30px;
      background-color: white;
      margin: auto;
      padding: 0 20px;
    }
    .check-box {
      margin: 7px;
    }
  }
  .dotted-line {
    width: 100%;
    position: absolute;
    border-bottom: 1px dashed #e9e9e9;
    height: 1px;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 0;
  }
</style>