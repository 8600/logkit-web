<template lang="pug">
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
</style>