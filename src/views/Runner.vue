<template lang="pug">
  .runner
    .title 七牛Logkit监控中心v1.5.4
    .label 收集器(runner)管理列表
    .runner-box
      .title-bar
        .title-bar-button 增加日志采集收集器
        .title-bar-button 增加系统信息采集收集器
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
.label {
  color: #595959;
  font-size: 12px;
  font-weight: 700;
  margin: 10px 15px;
}
.runner-box {
  margin: 10px;
  padding: 20px;
  background-color: white;
  width: calc(100% - 60px);
  height: calc(100% - 200px);
}
</style>
