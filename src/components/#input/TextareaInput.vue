<template>
  <div class="textarea-input">
    <div class="text-bar">
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
  .right {
    width: 400px;
  }
  textarea {
    width: 100%;
    max-width: 400px;
    height: 30px;
    height: 80px;
    border-color: #ccc;
    border-radius: 3px;
    background-color: whitesmoke;
  }
</style>