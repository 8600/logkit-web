<template>
  <div class="textarea-input">
    <div class="left">
      <div class="text">
        <span class="must">*</span>
        <span>数据库地址</span>
      </div>
      <div class="label">(mysql_datasource)</div>
    </div>
    <div class="right">
      <textarea></textarea>
    </div>
  </div>
</template>

<style scoped>
  .textarea-input {
    display: flex;
    justify-content: center;
  }
  .left {
    font-size: 12px;
    width: 200px;
    text-align: right;
    margin: 0 20px;
  }
  .text {
    color: #000;
  }
  .label {
    color: rgba(0, 0, 0, 0.43);
  }
  .right {
    width: 400px;
    margin: 0 20px;
  }
  textarea {
    width: 100%;
    max-width: 400px;
    height: 30px;
    height: 80px;
    border-color: #ccc;
    border-radius: 3px;
  }
</style>