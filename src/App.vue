<template>
  <div class="app" id="app">
    <div v-if="TokenFailure" class="token-failure">
      <div class="bg-mock"></div>
      <div class="text">
        用户信息已过期，请重新登录
      </div>
    </div>
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
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      include: 'Project,Setting'
    }
  },
  computed: {
    ...mapGetters([
      'TokenFailure'
    ])
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
    .token-failure {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 5000;
      height: 50px;
      .bg-mock {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.5;
      }
      .text {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        line-height: 50px;
        color: red;
        text-align: center;
        font-size: 18px;
      }
    }
  }
  .tab-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
</style>
