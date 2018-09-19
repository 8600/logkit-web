<template lang="pug">
  .button-68-28(@click="$emit('onClick')", :style="{color, background}") {{text}}
</template>

<script>
export default {
  props: {
    text: String,
    color: {
      type: String,
      default: 'white'
    },
    background: {
      type: String,
      default: '#108ee9'
    }
  }
}
</script>

<style scoped>
  .button-68-28 {
    line-height: 28px;
    width: 68px;
    height: 28px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 3px;
    text-align: center;
  }
</style>