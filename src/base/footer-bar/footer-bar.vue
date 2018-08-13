<template>
  <div class="nav-bar nav-footer">
    <div ref="preAction" v-show="actionShow" class="footer-action">
      <div @click="Add" class="action-item">
        <span>新增</span>
      </div>
      <div @click="preDelete" class="action-item">
        <span>删除</span>
      </div>
    </div>
    <div ref="doAction" v-show="!actionShow" class="footer-action">
      <div @click="Delete" class="action-item font-color-red">
        <span>确定删除</span>
      </div>
      <div @click="backPre" class="action-item font-color-sky">
        <span>返回</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      actionShow: true
    }
  },
  methods: {
    Add () {
      this.$emit('Add')
    },
    Delete () {
      this.actionShow = true
      this.$emit('Delete')
    },
    preDelete () {
      this.actionShow = false
      this.$emit('preDelete')
    },
    backPre () {
      this.actionShow = true
      this.$emit('backPre')
    }
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .nav-bar {
    display: block;
    height: 50px;
    background-color: #ffffff;
    border-top: 1px solid #dddddd;
    .footer-action {
      width: 100%;
      height: 100%;
      display: flex;
      .action-item {
        flex: 1;
        text-align: center;
        line-height: 45px;
        border-right: 1px solid #dddddd;
        .common-font-color();
        &.font-color-sky{
          .font-color-sky();
        }
        &.font-color-red{
          .font-color-red();
        }
        &:last-child {
          border-right: 0;
        }
      }
    }
  }
</style>
