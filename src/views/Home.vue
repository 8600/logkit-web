<template lang="pug">
  .home.box
    .left-box
      .logo
        img(src="../assets/logo.png")
      router-link.menu-item(tag="div", to="/collect") 采集管理
      router-link.menu-item(tag="div", to="/cluster") 集群管理
    router-view.right-box
    //- Loading
</template>

<script>
// @ is an alias to /src
import Loading from '@/components/Loading.vue'

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
  .router-link-active {
    background-color: cornflowerblue;
  }
}
.right-box {
  width: calc(100% - 200px);
}
.logo {
  height: 65px;
  position: relative;
  img {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
  }
}
</style>
