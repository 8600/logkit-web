<template lang="pug">
  .home.box
    .left-box
      .logo
      router-link.menu-item(tag="div", to="runner") 收集器(runner)管理
    router-view.right-box
    //- Loading
</template>

<script>
// @ is an alias to /src
import Loading from '@/components/Loading.vue';

export default {
  name: 'home',
  components: {
    Loading,
  }
}
</script>

<style scoped lang="less">
.home {
  display: flex;
}
.left-box {
  width: 200px;
  height: 100%;
  transition: all .3s;
  position: relative;
  background: #404040;
  .menu-item {
    cursor: pointer;
    color: white;
    line-height: 40px;
    text-align: center;
  }
  .menu-item {
    background-color: cornflowerblue;
  }
}
.right-box {
  width: calc(100% - 200px);
}
.logo {
  height: 65px;
}
</style>
