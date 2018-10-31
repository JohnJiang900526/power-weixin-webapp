<template>
  <div class="app" id="app">
    <keep-alive :include="include">
      <router-view></router-view>
    </keep-alive>
    <div class="tab-bar-wrap">
      <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TabBar from 'base/TabBar/TabBar.vue'

export default {
  name: 'App',
  data () {
    return {
      include: 'Project,Setting'
    }
  },
  components: {
    TabBar
  }
}
</script>

<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  html,body{
    .baseBgColor();
  }
  .app {
    width: 100%;
    height: 100%;
  }
  .tab-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
</style>
