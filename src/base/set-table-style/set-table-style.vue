<template>
  <transition name="slide">
    <div class="set-table-style">
      <ul class="table-style-lists">
        <li @click="selectedItem(index, item)" v-for="(item ,index) in tableStyles" :key="index" class="style-list">
          <div class="style-list-inner">
            <div class="list-item check-box">
              <check-icon :value="currentIndex === index"></check-icon>
            </div>
            <div class="list-item list-text">
              {{item.title}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { CheckIcon } from 'vux'
import { localStorageTag } from 'common/js/config'
import storage from 'good-storage'
import { getTableStyleIndex } from 'common/js/Util.js'

export default {
  data () {
    return {
      currentIndex: 0,
      tableStyles: [{
        title: '默认风格',
        style: 'default'
      }, {
        title: '简约风格',
        style: 'contractStyle'
      }, {
        title: '靓丽风格',
        style: 'beauty'
      }, {
        title: 'Table风格',
        style: 'table'
      }, {
        title: '豪华风格',
        style: 'luxury'
      }, {
        title: '豪华简约',
        style: 'luxuryBeauty'
      }]
    }
  },
  mounted () {
    this.getIndex()
  },
  methods: {
    selectedItem (index, item) {
      this.currentIndex = index
      this.storageStyle(item)
    },
    storageStyle (item) {
      storage.set(localStorageTag + 'tableStyle', item.style)
    },
    getIndex () {
      let style = storage.get(localStorageTag + 'tableStyle')
      this.currentIndex = getTableStyleIndex(style, this.tableStyles)
    }
  },
  components: {
    CheckIcon
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .set-table-style {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    background-color: #ffffff;
    border-bottom: 10px solid #ffffff;
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s
    }
    &.slide-enter, &.slide-leave-to{
      transform: translate3d(100%, 0, 0)
    }
    .table-style-lists {
      margin: 0;
      padding: 5px;
      .style-list {
        padding: 5px 10px;
        .bottom-line();
        .style-list-inner {
          display: flex;
          .list-item {
            flex: 1;
            line-height: 30px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.8);
            &.check-box {
              flex: 0 0 30px;
            }
          }
        }
      }
    }
  }
</style>
