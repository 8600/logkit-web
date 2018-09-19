<template lang="pug">
  .steps-label-horizontal
    .line
    .step-one.step-item
      .circle 1
      .text 配置数据源
    .step-two.step-item
      .circle 2
      .text 配置解析方式
    .step-three.step-item
      .circle 3
      .text 配置Transformer(非必填)
    .step-four.step-item
      .circle 4
      .text 配置发送方式
    .step-five.step-item
      .circle 5
      .text 确认并添加收集器
</template>

<style scoped lang="less">
  .steps-label-horizontal {
    display: flex;
    padding: 30px 0;
    position: relative;
    justify-content: space-between;
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
  .step-item {
    display: flex;
    height: 30px;
    line-height: 30px;
    z-index: 1;
    background-color: white;
    padding: 0 20px;
    .circle {
      width: 24px;
      text-align: center;
      height: 24px;
      line-height: 24px;
      border: 1px solid #b5b5b5;
      border-radius: 50%;
      color: #b5b5b5;
      margin: 2px;
    }
    .text {
      color: rgba(0,0,0,.43);
      margin: 0 10px;
      font-weight: 700;
      font-size: 14px;
    }
  }
</style>