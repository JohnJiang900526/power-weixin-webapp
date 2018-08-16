<template>
  <div class="form-row">
    <div v-if="type === 'text'" class="input-row input">
      <label class="label-text">{{ label }}</label>
      <input
        type="text"
        class="input"
        v-model="rowValue"
        :readonly="readonly"
        :placeholder="placeholder">
    </div>

    <div v-if="type === 'select'" class="input-row select">
      <label class="label-text">{{ label }}</label>
      <power-select
        class="input"
        v-model="rowValue"
        :comboboxdata="comboboxdata"
        :KeyWord="KeyWord"
        :field="field"
        :title="'请选择' + label"
        @change="change"
      >
      </power-select>
    </div>

    <div v-if="type === 'textarea'" class="textarea-row textarea">
      <label class="label-text">{{ label }}</label>
      <group class="textarea-content">
        <x-textarea
          name="description"
          v-model="rowValue"
          :max="200"
        ></x-textarea>
      </group>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// import formatDate from 'common/js/Util.js'
import { PowerSelect } from 'components/index.js'

import { XTextarea, Group } from 'vux'

export default {
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    value: null,
    KeyWord: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    comboboxdata: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      rowValue: ''
    }
  },
  methods: {
    change (value) {
      this.rowValue = value
    }
  },
  watch: {
    value (newValue) {
      this.rowValue = newValue
    },
    rowValue (newRowValue) {
      let item = {
        KeyWord: this.KeyWord,
        field: this.field,
        value: newRowValue
      }
      if (this.KeyWord === '') {
        throw Error('your KeyWord is null, set it please')
      }
      if (this.field === '') {
        throw Error('your field is null, set it please')
      }
      this.$emit('enterChange', item)
    }
  },
  components: {
    PowerSelect,
    XTextarea,
    Group
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .form-row {
    .input-row {
      .input-row();
      .label-text {
        .label-text();
      }
      .input {
        .input();
        &.cube-select_active::after, &.cube-select::after {
          border: none!important;
        }
        padding-right: 10px;
      }
    }
    .textarea-row {
      padding: 0 10px;
      .label-text {
        display: block;
        padding: 10px 0;
        font-size: 15px;
      }
      .textarea-content {
        .weui-cells{
          margin-top: 0;
          textarea {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
          }
        }
      }
    }
  }
</style>
