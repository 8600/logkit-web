<template lang="pug">
  .check-card(@click="cardClick", :class="{active: value}")
    .icon(v-if="value") &#xe609;
    .icon(v-else) &#xe600;
    .text {{text}}
</template>

<script>
export default {
  props: {
    value: Boolean,
    text: String
  },
  methods: {
    cardClick () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style scoped lang="less">
  .check-card {
    cursor: pointer;
    position: relative;
    background-color: #756d6d;
    display: flex;
    height: 50px;
    width: 280px;
    float: left;
    margin: 10px;
    color: white;
    line-height: 50px;
    font-size: 12px;
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
    .icon {
      width: 50px;
      text-align: center;
      font-size: 1.6rem;
    }
    .text {
      margin: 0 10px;
    }
  }
  .active {
    background-color: cornflowerblue;
  }
  .check-card:hover {
    transform: scale(1.05);
  }
</style>
