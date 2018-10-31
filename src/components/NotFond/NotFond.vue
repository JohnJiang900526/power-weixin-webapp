<template>
  <div class="not-font-page">
    <div class="page-main">
      <div class="page-inner">
        <p>404 Page Not Find</p>
        <div class="back-page">
          <div class="back-page-content">
            <router-link to="/login" class="btn-text">
              返回登录页面
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .not-font-page {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background-color: #f4f4f4;
    .page-main {
      position: relative;
      width:100%;
      height: 100%;
      .page-inner {
        width: 90%;
        .positionCenter();
        margin: 0 auto;
        padding: 30px 0;
        text-align: center;
        color: #F1322A;
        font-size: 25px;
        .back-page {
          margin-top: 150px;
          padding: 10px 0;
          .back-page-content {
            .btn-text {
              display: block;
              width: 80%;
              margin: 0 auto;
              border-radius: 20px;
              text-align: center;
              padding: 10px 0;
              font-size: 14px;
              color: #ffffff;
              background-color: #4F84EC;
            }
          }
        }
      }
    }
  }
</style>
