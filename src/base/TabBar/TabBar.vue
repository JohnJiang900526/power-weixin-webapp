<template>
  <div class="tab-bar-inner">
    <div class="tab-bar">
      <router-link to="/weixin/project" class="tab-inner">
        <span class="fa fa-bars"></span>
        <span class="text">项目中心</span>
      </router-link>
    </div>
    <div class="tab-bar">
      <router-link to="/weixin/business" class="tab-inner">
        <span class="fa fa-home"></span>
        <span class="text">业务中心</span>
      </router-link>
    </div>
    <div class="tab-bar">
      <router-link to="/weixin/setting" class="tab-inner">
        <span class="fa fa-user-circle"></span>
        <span class="text">我的</span>
      </router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
</script>
<style lang="less" scoped  rel="stylesheet/less">
  .tab-bar-inner {
    align-items:center;
    height: 55px;
    width: 100%;
    display: flex;
    background-color: #F7F7FA;
    border-top: 1px solid #ddd;
    .tab-bar{
      flex: 1;
      text-align: center;
      .tab-inner {
        color: rgba(0, 0, 0, 0.6);
        span {
          display: block;
          &.text{
            font-size: 12px;
            padding: 3px 0;
          }
          &.fa{
            font-size: 20px;
          }
        }
        &.router-link-active{
          color: #04BE02;
        }
      }
    }
  }
</style>
