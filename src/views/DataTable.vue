<template lang="pug">
  .data-table
    .label 收集器(runner)管理列表
    .runner-box
      .title-bar
        router-link.title-bar-button(tag="div", to="reader")
          .icon &#xe659;
          span.text 增加日志采集收集器
        .title-bar-button
          .icon &#xe659;
          span.text 增加系统信息采集收集器
      .table-box
        table(border="0", cellspacing="0", cellpadding="0")
          thead
            tr
              th 名称
              th 修改时间
              th 运行状态
              th 读取总条数
              th 读取条数(条/秒)
              th 发送速率(条/s)
              th 解析成功/总 (条数)
              th 发送成功/总 (条数)
              th 路径
              th 待读取数据
              th 错误日志
              th 详细配置
              th 编辑
              th 操作
              th 重置
              th 删除
        .empty
          .icon &#xe64b;
          span 暂无数据
</template>

<style scoped lang="less">
table {
  width: 100%;
}
.label {
  color: #595959;
  font-size: 12px;
  font-weight: 700;
  margin: 0 15px;
  padding-top: 10px;
  height: 30px;
  line-height: 30px;
}
.table-box {
  width: 100%;
  font-size: 12px;
  position: relative;
  height: calc(100% - 50px);
  thead {
    background: #f7f7f7;
    th {
      border:0;
      font-weight: 500;
      padding: 10px 0;
    }
  }
  .empty {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    height: 40px;
    color: #919191;
    line-height: 40px;
    text-align: center;
    font-size: 2em;
    .icon {
      width: 40px;
      text-align: center;
    }
  }
}
.runner-box {
  margin: 10px;
  padding: 20px;
  background-color: white;
  width: calc(100% - 60px);
  height: calc(100% - 120px);
}
.title-bar {
  padding-bottom: 15px;
}
.title-bar-button {
  display: flex;
  line-height: 28px;
  color: #108ee9;
  width: 170px;
  cursor: pointer;
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