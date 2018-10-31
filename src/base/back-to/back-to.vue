<template>
  <div class="back-to">
    <div @click="backTo" class="back-wrap">
      <span class="fa fa-reply"></span>
      <p class="text">业务中心</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  methods: {
    backTo () {
      this.$router.push('/business')
    }
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
  .back-to {
    position: absolute;
    width: 60px;
    height: 60px;
    right: 20px;
    bottom: 50px;
    border-radius: 50%;
    z-index: 1000;
    background-color: #dddddd;
    opacity: 0.7;
    .back-wrap {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 20px;
      color: #333;
      .text {
        font-size: 10px;
      }
      .fa {
        margin-top: 10px;
        font-size: 10px;
      }
    }
  }
</style>
