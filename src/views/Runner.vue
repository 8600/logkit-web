<template lang="pug">
  .runner
    .title 七牛Logkit监控中心v1.5.4
    router-view.runner-view
</template>

<style scoped lang="less">
.runner {
  background-color: #ececec;
}
.title {
  color: #595959;
  line-height: 60px;
  font-size: 24px;
  text-align: center;
  background-color: white;
}
.runner-view {
  width: 100%;
  position: relative;
  height: calc(100% - 40px);
}
</style>
