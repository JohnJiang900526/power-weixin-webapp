<template>
  <li class="tree-grid">
    <div class="grid-line-content">
      <div @click.stop.prevent="toggle(item)" class="grid-item icon">
        <x-icon class="x-icon" v-show="!open && !isUnderItem" type="ios-plus-outline" size="20"></x-icon>
        <x-icon class="x-icon" v-show="open && !isUnderItem" type="ios-minus-outline" size="20"></x-icon>
      </div>
      <div class="grid-item check-box" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon class="check-icon" :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.stop.prevent="selectItemView(item)" class="grid-item main-content">
        <p class="title">{{ item[title] || '暂无' }}</p>
        <div class="main-content-lists">
          <div class="list-item left">
            {{ item[left] || '暂无' }}
          </div>
          <div class="list-item center">
            {{ _formatDate(item[center]) || '暂无' }}
          </div>
          <div class="list-item right">
            {{ item[right] || '暂无' }}
          </div>
        </div>
      </div>
    </div>
    <ul v-show="open" v-if="item.children && item.children.length > 0">
      <tree-grid
        v-for="liItem in item.children" :key="liItem.Id"
        :item="liItem"
        :showCheckBox="showCheckBox"
        :title="title"
        :left="left"
        :center="center"
        :right="right"
        @selectItemView="selectItemView"
        @selectItem="_selectItem"
        @unSelectItem="_unSelectItem"
        @hideCheckBox="backDefault"
      ></tree-grid>
    </ul>
  </li>
</template>
<script type="text/ecmascript-6">
import { CheckIcon } from 'vux'
import { formatDate } from 'common/js/Util.js'

export default {
  name: 'treeGrid',
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
      default: ''
    },
    left: {
      type: String,
      default: ''
    },
    center: {
      type: String,
      default: ''
    },
    right: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      open: true,
      isUnderItem: false,
      checked: false
    }
  },
  methods: {
    selectItemView (item) {
      if (this.showCheckBox) {
        this.checked = !this.checked
        if (this.checked) {
          this.$emit('selectItem', item)
        } else {
          this.$emit('unSelectItem', item)
        }
      } else {
        this.$emit('selectItemView', item)
      }
    },
    toggle (item) {
      if (item.children && item.children.length > 0) {
        this.open = !this.open
      }
    },
    backDefault () {
      this.$emit('hideCheckBox')
      this.checked = false
    },
    _selectItem (item) {
      this.$emit('selectItem', item)
    },
    _unSelectItem (item) {
      this.$emit('unSelectItem', item)
    },
    _formatDate (date) {
      return formatDate(date)
    }
  },
  components: {
    CheckIcon
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .tree-grid {
    padding-left: 3px;
    .grid-line-content {
      display: flex;
      padding: 5px 10px;
      background-color: #ffffff;
      border-radius: 3px;
      margin-top: 5px;
      .grid-item {
        flex: 1;
        position: relative;
        &.icon {
          width: 20px;
          flex: 0 0 20px;
          min-width: 5px;
          font-size: 20px;
          .x-icon {
            .positionCenter();
            left: 20%;
          }
        }
        &.check-box {
          width: 30px;
          flex: 0 0 30px;
          min-width: 5px;
          .check-icon-wrap {
            .positionCenter();
          }
        }
        &.main-content {
          min-width: 10px;
          display: block;
          .title {
            width: 100%;
            padding: 5px 0;
            color: rgba(0, 0, 0, 0.8);
            font-size: 14px;
            .css3-ellipsis();
          }
          .main-content-lists {
            width: 100%;
            padding: 10px 0 5px 0;
            display: flex;
            .list-item {
              min-width: 10px;
              flex: 1;
              color: rgba(0, 0, 0, 0.6);
              font-size: 12px;
              &.left {
                text-align: left;
              }
              &.center {
                text-align: center;
              }
              &.right {
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
</style>
