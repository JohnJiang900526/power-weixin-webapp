<template>
  <ul class="switches" :style="{'line-height': lineHeight, 'width': switcheWidth }">
    <li class="switch-item" @click="switchItem(index)" :key="index" v-for="(item, index) in switches" :class="{'active': currentIndex === index}">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    switches: {
      type: Array,
      default () {
        return [{
          name: '项目列表'
        }, {
          name: 'EPS'
        }]
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    },
    lineHeight: {
      type: Number,
      default: 1
    },
    switcheWidth: {
      type: String,
      default: '100%'
    }
  },
  methods: {
    switchItem (index) {
      this.$emit('switch', index)
    }
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .switches {
    display: flex;
    align-items: center;
    width: 100%;
    .switch-item {
      flex: 1;
      padding: 8px;
      text-align: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.8);
      position: relative;
      .css3-ellipsis();
      &.active {
        color: #007ACC;
      }
      &.active:after {
        content: '';
        height: 2px;
        width: 100%;
        position: absolute;
        bottom: -1px;
        left: 0;
        background-color: #007ACC;
      }
    }
  }
</style>
