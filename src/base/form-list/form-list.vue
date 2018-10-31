<template>
  <div class="form-list">
    <div v-if="tableType === 'default'" for="1.默认风格" class="list-unit-wrap default">
      <div class="list-checkbox" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.prevent="selectItem(item)" class="list-unit-inner">
        <div v-if="option.title.show" class="list-title">
          {{ option.title.text ? option.title.text + ':' : '' }} {{ title }}
        </div>
        <div class="list-content">
          <div v-if="option.left.show" class="list-item left">
            {{ option.left ? option.left.text + ':' : '' }}{{left}}
          </div>
          <div v-if="option.center.show" class="list-item center">
            {{ option.center ? option.center.text + ':' : '' }} {{center}}
          </div>
          <div v-if="option.right.show" class="list-item right">
            {{ option.right ? option.right.text + ':' : '' }} {{right}}
          </div>
        </div>
        <div v-if="formatOption.tag.show" :class="'list-tag  ' + this.tag.color">
          {{ tag.value }}
        </div>
      </div>
    </div>
    <div v-if="tableType === 'contractStyle'" for="2.简约风格" class="list-unit-wrap contract-style">
      <div class="list-checkbox" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.prevent="selectItem(item)" class="list-unit-inner">
        <div v-if="formatOption.title.show" class="list-title">
          {{ title }}
        </div>
        <div class="list-content">
          <div v-if="formatOption.left.show" class="list-item left">{{left}}</div>
          <div v-if="formatOption.center.show" class="list-item center">{{center}}</div>
          <div v-if="formatOption.right.show" class="list-item right">{{right}}</div>
        </div>
        <div v-if="formatOption.tag.show" :class="'list-tag  ' + this.tag.color">
          {{ tag.value }}
        </div>
      </div>
    </div>
    <div v-if="tableType === 'table'" for="3.table风格" class="list-unit-wrap table">
      <div class="list-checkbox" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.prevent="selectItem(item)" class="list-unit-inner">
        <div class="list-content table">
          <div v-if="formatOption.title.show" class="list-item left">{{title}}</div>
          <div v-if="formatOption.left.show" class="list-item left">{{left}}</div>
          <div v-if="formatOption.center.show" class="list-item center">{{center}}</div>
          <div v-if="formatOption.right.show" class="list-item right">{{right}}</div>
        </div>
        <div v-if="formatOption.tag.show" :class="'list-tag  ' + this.tag.color">
          {{ tag.value }}
        </div>
      </div>
    </div>
    <div v-if="tableType === 'beauty'" for="4.靓丽风格" class="list-unit-wrap beauty">
      <div class="list-checkbox" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.prevent="selectItem(item)" class="list-unit-inner">
        <div v-if="formatOption.title.show" class="list-title beauty">
          {{ formatOption.title ? option.title.text + ':' : '' }} <span class="text">{{ title }}</span>
        </div>
        <div class="list-content">
          <div v-if="formatOption.left.show" class="list-item left beauty">
            {{ formatOption.left ? formatOption.left.text + ':' : '' }}<span>{{left}}</span>
          </div>
          <div v-if="formatOption.center.show" class="list-item center beauty">
            {{ formatOption.center ? formatOption.center.text + ':' : '' }} <span>{{center}}</span>
          </div>
          <div v-if="formatOption.right.show" class="list-item right beauty">
            {{ formatOption.right ? formatOption.right.text + ':' : '' }} <span>{{right}}</span>
          </div>
        </div>
        <div v-if="formatOption.tag.show" :class="'list-tag  ' + this.tag.color">
          {{ tag.value }}
        </div>
      </div>
    </div>
    <div v-if="tableType === 'luxury'" for="5.豪华风格" class="list-unit-wrap luxury">
      <div class="list-checkbox" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.prevent="selectItem(item)" class="list-unit-inner">
        <div v-if="formatOption.title.show" class="list-title luxury">
          {{ formatOption.title ? formatOption.title.text + ':' : '' }} {{ title }}
        </div>
        <div class="list-content">
          <div v-if="formatOption.left.show" class="list-item left luxury">
            {{ formatOption.left ? formatOption.left.text + ':' : '' }}{{left}}
          </div>
          <div v-if="formatOption.center.show" class="list-item center luxury">
            {{ formatOption.center ? formatOption.center.text + ':' : '' }} {{center}}
          </div>
          <div v-if="formatOption.right.show" class="list-item right luxury">
            {{ formatOption.right ? formatOption.right.text + ':' : '' }} {{right}}
          </div>
        </div>
        <div v-if="formatOption.tag.show" :class="'list-tag  ' + this.tag.color">
          {{ tag.value }}
        </div>
      </div>
    </div>
    <div v-if="tableType === 'luxuryBeauty'" for="6.豪华简约" class="list-unit-wrap luxuryBeauty">
      <div class="list-checkbox" v-show="showCheckBox">
        <div class="check-icon-wrap">
          <check-icon :value.sync="checked"></check-icon>
        </div>
      </div>
      <div @click.prevent="selectItem(item)" class="list-unit-inner">
        <div v-if="formatOption.title.show" class="list-title luxuryBeauty">
           {{ title }}
        </div>
        <div class="list-content">
          <div v-if="formatOption.left.show" class="list-item left luxuryBeauty">{{left}}</div>
          <div v-if="formatOption.center.show" class="list-item center luxuryBeauty">{{center}}</div>
          <div v-if="formatOption.right.show" class="list-item right luxuryBeauty">{{right}}</div>
        </div>
        <div v-if="formatOption.tag.show" :class="'list-tag  ' + this.tag.color">
          {{ tag.value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { CheckIcon } from 'vux'
import { dataConversion } from 'common/js/Util.js'

export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
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
          },
          tag: {
            text: '',
            show: false
          }
        }
      }
    },
    tableType: {
      type: String,
      default: 'default'
    },
    showCheckBox: {
      type: Boolean,
      default: false
    },
    comboboxdata: {
      type: Object,
      default () {
        return {}
      }
    },
    KeyWord: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      formatOption: {
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
        },
        tag: {
          text: '',
          show: false
        }
      },
      checked: false,
      title: '',
      left: '',
      center: '',
      right: '',
      tag: {
        value: '',
        color: 'power-project-menu-bg7'
      }
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
    },
    setData (newItem) {
      this.formatOption = Object.assign(this.formatOption, this.option)
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

      if (this.option && this.option.tag && this.option.tag.field && this.option.tag.show) {
        let field = this.option.tag.field
        let type = this.option.tag.type
        this.tag = Object.assign(this.tag, dataConversion(newItem[field], type, this.comboboxdata, this.KeyWord, field))
      }
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
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .list-unit-wrap{
    display: flex;
    box-shadow:3px 3px 6px #dddddd;
    border-radius: 3px;
    &.luxury, &.luxuryBeauty {
      border-left: 4px solid #64BD85;
    }
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
      padding: 4px 0;
      min-width: 10px;
      .list-title {
        font-size: 14px;
        padding: 5px 10px;
        color: rgba(0, 0, 0, 0.8);
        max-width: 80%;
        .css3-ellipsis();
        &.beauty, &.luxury, &.luxuryBeauty {
          color: #295AA6;
        }
      }
      .list-content {
        margin-top: 15px;
        display: flex;
        padding: 15px 10px;
        &.table {
          margin-top: 0;
        }
        .list-item{
          flex: 1;
          min-width: 0px;
          text-align: left;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.5);
          .css3-ellipsis();
          &.beauty, &.luxury, &.luxuryBeauty {
            color: #64BD85;
          }
        }
      }
      .list-tag {
        position: absolute;
        top: 3px;
        right: 0;
        min-width: 60px;
        font-size: 10px;
        padding: 3px 10px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
</style>
