<template>
  <li class="tree-grid">
    <div v-if="tableType === 'default'" for="1.默认风格" class="grid-line-content" :style="{backgroundColor: bgColor}">
      <div @click.stop.prevent="toggle(item)" class="grid-item icon">
        <x-icon class="x-icon" v-show="!open && !isUnderItem" type="ios-plus-outline" size="20"></x-icon>
        <x-icon class="x-icon" v-show="open && !isUnderItem" type="ios-minus-outline" size="20"></x-icon>
      </div>
      <div class="grid-item check-box" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon class="check-icon" :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.stop.prevent="selectItemView(item)"
          class="grid-item main-content"
          :style="{paddingLeft: getPaddingLeft}"
        >
        <p v-if="option.title.show" class="title">
          {{ option.title.text ? option.title.text + ':' : '' }} {{ title }}
        </p>
        <div class="main-content-lists">
          <div v-if="option.left.show" class="list-item left">
            {{ option.left.text ? option.left.text + ':' : '' }} {{ left }}
          </div>
          <div v-if="option.center.show" class="list-item center">
            {{ option.center.text ? option.center.text + ':' : '' }} {{ center }}
          </div>
          <div v-if="option.right.show" class="list-item right">
            {{ option.right.text ? option.right.text + ':' : '' }} {{ right }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="tableType === 'contractStyle'" for="2.简约风格" class="grid-line-content" :style="{backgroundColor: bgColor}">
      <div @click.stop.prevent="toggle(item)" class="grid-item icon">
        <x-icon class="x-icon" v-show="!open && !isUnderItem" type="ios-plus-outline" size="20"></x-icon>
        <x-icon class="x-icon" v-show="open && !isUnderItem" type="ios-minus-outline" size="20"></x-icon>
      </div>
      <div class="grid-item check-box" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon class="check-icon" :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.stop.prevent="selectItemView(item)"
          class="grid-item main-content"
          :style="{paddingLeft: getPaddingLeft}"
        >
        <p v-if="option.title.show" class="title">
          {{ title }}
        </p>
        <div class="main-content-lists">
          <div v-if="option.left.show" class="list-item left">
            {{ left }}
          </div>
          <div v-if="option.center.show" class="list-item center">
            {{ center }}
          </div>
          <div v-if="option.right.show" class="list-item right">
            {{ right }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="tableType === 'table'" for="3.table风格" class="grid-line-content" :style="{backgroundColor: bgColor}">
      <div @click.stop.prevent="toggle(item)" class="grid-item icon">
        <x-icon class="x-icon" v-show="!open && !isUnderItem" type="ios-plus-outline" size="20"></x-icon>
        <x-icon class="x-icon" v-show="open && !isUnderItem" type="ios-minus-outline" size="20"></x-icon>
      </div>
      <div class="grid-item check-box" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon class="check-icon" :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.stop.prevent="selectItemView(item)"
          class="grid-item main-content"
          :style="{paddingLeft: getPaddingLeft}"
        >
        <div class="main-content-lists">
          <div v-if="option.title.show" class="list-item title">
            {{ title }}
          </div>
          <div v-if="option.left.show" class="list-item left">
            {{ left }}
          </div>
          <div v-if="option.center.show" class="list-item center">
            {{ center }}
          </div>
          <div v-if="option.right.show" class="list-item right">
            {{ right }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="tableType === 'beauty'" for="4.靓丽风格" class="grid-line-content beauty" :style="{backgroundColor: bgColor}">
      <div @click.stop.prevent="toggle(item)" class="grid-item icon">
        <x-icon class="x-icon" v-show="!open && !isUnderItem" type="ios-plus-outline" size="20"></x-icon>
        <x-icon class="x-icon" v-show="open && !isUnderItem" type="ios-minus-outline" size="20"></x-icon>
      </div>
      <div class="grid-item check-box" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon class="check-icon" :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.stop.prevent="selectItemView(item)"
          class="grid-item main-content"
          :style="{paddingLeft: getPaddingLeft}"
        >
        <p v-if="option.title.show" class="title beauty">
          {{ option.title.text ? option.title.text + ':' : '' }} {{ title }}
        </p>
        <div class="main-content-lists">
          <div v-if="option.left.show" class="list-item beauty left">
            {{ option.left.text ? option.left.text + ':' : '' }} {{ left }}
          </div>
          <div v-if="option.center.show" class="list-item beauty center">
            {{ option.center.text ? option.center.text + ':' : '' }} {{ center }}
          </div>
          <div v-if="option.right.show" class="list-item beauty right">
            {{ option.right.text ? option.right.text + ':' : '' }} {{ right }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="tableType === 'luxury'" for="5.豪华风格" class="grid-line-content luxury" :style="{backgroundColor: bgColor}">
      <div @click.stop.prevent="toggle(item)" class="grid-item icon">
        <x-icon class="x-icon" v-show="!open && !isUnderItem" type="ios-plus-outline" size="20"></x-icon>
        <x-icon class="x-icon" v-show="open && !isUnderItem" type="ios-minus-outline" size="20"></x-icon>
      </div>
      <div class="grid-item check-box" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon class="check-icon" :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.stop.prevent="selectItemView(item)"
          class="grid-item main-content"
          :style="{paddingLeft: getPaddingLeft}"
        >
        <p v-if="option.title.show" class="title luxury">
          {{ option.title.text ? option.title.text + ':' : '' }} {{ title }}
        </p>
        <div class="main-content-lists">
          <div v-if="option.left.show" class="list-item luxury left">
            {{ option.left.text ? option.left.text + ':' : '' }} {{ left }}
          </div>
          <div v-if="option.center.show" class="list-item luxury center">
            {{ option.center.text ? option.center.text + ':' : '' }} {{ center }}
          </div>
          <div v-if="option.right.show" class="list-item luxury right">
            {{ option.right.text ? option.right.text + ':' : '' }} {{ right }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="tableType === 'luxuryBeauty'" for="6.豪华简约" class="grid-line-content luxuryBeauty" :style="{backgroundColor: bgColor}">
      <div @click.stop.prevent="toggle(item)" class="grid-item icon">
        <x-icon class="x-icon" v-show="!open && !isUnderItem" type="ios-plus-outline" size="20"></x-icon>
        <x-icon class="x-icon" v-show="open && !isUnderItem" type="ios-minus-outline" size="20"></x-icon>
      </div>
      <div class="grid-item check-box" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon class="check-icon" :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.stop.prevent="selectItemView(item)"
          class="grid-item main-content"
          :style="{paddingLeft: getPaddingLeft}"
        >
        <p v-if="option.title.show" class="title luxuryBeauty">
          {{ title }}
        </p>
        <div class="main-content-lists">
          <div v-if="option.left.show" class="list-item luxuryBeauty left">
             {{ left }}
          </div>
          <div v-if="option.center.show" class="list-item luxuryBeauty center">
             {{ center }}
          </div>
          <div v-if="option.right.show" class="list-item luxuryBeauty right">
             {{ right }}
          </div>
        </div>
      </div>
    </div>

    <ul v-show="open" v-if="item.children && item.children.length > 0">
      <tree-grid
        v-for="liItem in item.children" :key="liItem.Id"
        :item="liItem"
        :showCheckBox="showCheckBox"
        :levelNum="computedNum"
        :option="option"
        :tableType="tableType"
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
import { formatDate, dataConversion } from 'common/js/Util.js'

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
    option: {
      type: Object,
      default () {
        return {
          title: {
            text: '',
            show: true
          },
          left: {
            text: '',
            show: true
          },
          center: {
            text: '',
            show: true
          },
          right: {
            text: '',
            show: true
          }
        }
      }
    },
    tableType: {
      type: String,
      default: 'default'
    },
    levelNum: {
      type: Number,
      default: 0
    }
  },
  computed: {
    bgColor () {
      return this.levelNum === 0 ? '#95CAFC' : this.levelNum === 1 ? '#CEFFCF' : '#ffffff'
    },
    computedNum () {
      return this.levelNum + 1
    },
    getPaddingLeft () {
      return this.computedNum * 13 + 'px'
    }
  },
  data () {
    return {
      open: true,
      isUnderItem: false,
      checked: false,
      num: 0,
      title: '',
      left: '',
      center: '',
      right: ''
    }
  },
  mounted () {
    this.timer = setTimeout(() => {
      this.setData(this.item)
    }, 500)
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
    },
    setData (newItem) {
      if (this.option && this.option.title && this.option.title.field) {
        let field = this.option.title.field
        let type = this.option.title.type
        this.title = dataConversion(newItem[field], type)
      }
      if (this.option && this.option.left && this.option.left.field) {
        let field = this.option.left.field
        let type = this.option.left.type
        this.left = dataConversion(newItem[field], type)
      }
      if (this.option && this.option.center && this.option.center.field) {
        let field = this.option.center.field
        let type = this.option.center.type
        this.center = dataConversion(newItem[field], type)
      }
      if (this.option && this.option.right && this.option.right.field) {
        let field = this.option.right.field
        let type = this.option.right.type
        this.right = dataConversion(newItem[field], type)
      }
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  watch: {
    item: {
      handler (newItem, oldItem) {
        this.setData(newItem)
      },
      immediate: true
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
    .grid-line-content {
      display: flex;
      padding: 5px 10px;
      background-color: #ffffff;
      border-radius: 3px;
      margin-top: 5px;
      &.luxury, &.luxuryBeauty {
        border-left: 4px solid #64BD85;
      }
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
            fill: green;
            display: block;
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
            padding: 3px 0;
            color: rgba(0, 0, 0, 0.8);
            font-size: 12px;
            .css3-ellipsis();
            &.beauty, &.luxury, &.luxuryBeauty {
              color: #295AA6;
            }
          }
          .main-content-lists {
            width: 100%;
            padding: 5px 0 3px 0;
            display: flex;
            .list-item {
              min-width: 10px;
              flex: 1;
              color: rgba(0, 0, 0, 0.6);
              font-size: 10px;
              .css3-ellipsis();
              &.beauty, &.luxury, &.luxuryBeauty {
                color: #64BD85;
              }
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
