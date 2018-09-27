<template>
  <div class="solt-input">
    <div class="text-bar">
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
  .right {
    width: 400px;
    line-height: 26px;
    display: flex;
    color: rgba(0,0,0,.65);
    font-size: 12px;
  }
</style>