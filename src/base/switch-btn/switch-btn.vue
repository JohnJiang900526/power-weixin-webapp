<template>
  <div class="switch-btn">
    <div class="switch-list">
      <div @click="goToPage('workinfos')" class="text">
        <span>审批</span>
        <span v-if="Work !== 0" class="badge">{{ Work }}</span>
      </div>
    </div>
    <div @click="goToPage('messageinfos')" class="switch-list">
      <div class="text">
        <span>消息</span>
        <span v-if="Message !== 0" class="badge">{{ Message }}</span>
      </div>
    </div>
    <div @click="goToPage('notifyInfos')" class="switch-list">
      <div class="text">
        <span>通知</span>
        <span v-if="Notify !== 0" class="badge">{{ Notify }}</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    Work: {
      type: Number,
      default: 0
    },
    Message: {
      type: Number,
      default: 0
    },
    Notify: {
      type: Number,
      default: 0
    }
  },
  methods: {
    goToPage (page) {
      this.$router.push(`/${page}`)
    }
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  .switch-btn{
    display: flex;
    width: 100%;
    background-color: #ffffff;
    .switch-list {
      flex: 1;
      border-right: 1px solid #dddddd;
      padding: 5px 0;
      .text{
        display: block;
        width: 50%;
        height: 30px;
        text-align: center;
        margin: 0 auto;
        line-height: 30px;
        position: relative;
        font-size: 14px;
        .badge{
          display: inline-block;
          position: absolute;
          min-width: 15px;
          height: 15px;
          line-height: 15px;
          border-radius: 9px;
          top: 0px;
          right: -10px;
          background-color: red;
          color: #ffffff;
          font-size: 10px;
        }
      }
      &:last-child{
        border-right: 1px solid transparent;
      }
    }
  }
</style>
