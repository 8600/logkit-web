<template lang="pug">
  .line-bar
    .line
</template>

<style scoped>
  .line-bar {
    height: 20px;
    position: relative;
  }
  .line {
    width: 100%;
    position: absolute;
    background-color: #e9e9e9;
    height: 1px;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 0;
  }
</style>
