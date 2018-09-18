<template lang="pug">
  .runner
    .title 七牛Logkit监控中心v1.5.4
    .label 收集器(runner)管理列表
    .runner-box
      .title-bar
        router-link.title-bar-button(tag="div", to="collector")
          .icon &#xe659;
          span.text 增加日志采集收集器
        .title-bar-button
          .icon &#xe659;
          span.text 增加系统信息采集收集器
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
  height: calc(100% - 146px);
}
.title-bar {
  margin: 10px 0;
}
.title-bar-button {
  display: flex;
  line-height: 28px;
  color: #108ee9;
  width: 170px;
  font-size: 12px;
  margin-right: 10px;
  border: 1px solid #108ee9;
  border-radius: 5px;
  display: inline-block;
  .icon {
    width: 28px;
    text-align: center;
  }
}
</style>
