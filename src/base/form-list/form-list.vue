<template>
  <div class="list-unit-wrap">
    <div class="list-checkbox" v-show="showCheckBox">
      <div class="check-icon-wrap">
        <check-icon :value.sync="checked"></check-icon>
      </div>
    </div>
    <div @click.prevent="selectItem(item)" class="list-unit-inner">
      <div class="list-title">
        {{ title }}
      </div>
      <div class="list-content">
        <div class="list-item left">{{left}}</div>
        <div class="list-item center">{{center}}</div>
        <div class="list-item right">{{right}}</div>
      </div>
      <div v-if="tagShow" class="list-tag">
        {{ tag }}
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { CheckIcon } from 'vux'

export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    showCheckBox: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '暂无'
    },
    tag: {
      type: String,
      default: '暂无'
    },
    left: {
      type: String,
      default: '暂无'
    },
    center: {
      type: String,
      default: '暂无'
    },
    right: {
      type: String,
      default: '暂无'
    },
    tagShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    // 选中当前数据
    selectItem (item) {
      if (this.showCheckBox) {
        this.checked = !this.checked
        if (this.checked) {
          this.$emit('selectItem', item)
        } else {
          this.$emit('unSelectItem', item)
        }
      } else {
        return false
      }
    },
    // 返回没有选中状态
    backDefault () {
      this.checked = false
    }
  },
  components: {
    CheckIcon
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .list-unit-wrap{
    display: flex;
    .list-checkbox{
      flex: 0 0 40px;
      width: 40px;
      position: relative;
      .check-icon-wrap {
        .positionCenter();
      }
    }
    .list-unit-inner {
      flex: 1;
      position: relative;
      display: block;
      min-width: 80%;
      padding: 4px 0;
      .list-title {
        width: 80%;
        font-size: 15px;
        padding: 5px 10px;
        color: rgba(0, 0, 0, 0.8);
        .css3-ellipsis
      }
      .list-content {
        margin-top: 15px;
        display: flex;
        padding: 5px 10px;
        .list-item{
          flex: 1;
          min-width: 0px;
          text-align: center;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          .css3-ellipsis();
          &.left {
            text-align: left;
          }
          &.right {
            text-align: right;
          }
        }
      }
      .list-tag {
        position: absolute;
        top: 3px;
        right: 0;
        min-width: 30px;
        font-size: 12px;
        padding: 5px 10px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        text-align: center;
        background-color: #0AB9F5;
        color: #ffffff;
      }
    }
  }
</style>
