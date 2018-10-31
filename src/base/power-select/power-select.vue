<template>
  <cube-select
    v-model="selectData"
    :title="title"
    :options="options"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    @picker-show="test"
    @change="change">
  </cube-select>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '请选择'
    },
    value: null,
    comboboxdata: {
      type: Object,
      default () {
        return {}
      }
    },
    KeyWord: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      options: [],
      selectData: ''
    }
  },
  methods: {
    test () {
    },
    checkBoboxData (comboboxdata) {
      let selectName = `${this.KeyWord}.${this.field}`
      this.selectNameData = this.comboboxdata[selectName]
      this.options = this.formatOption(this.selectNameData)
    },
    formatOption (selectNameData) {
      let arr = []
      let TextField = selectNameData.TextField
      selectNameData.Data.forEach((item, index) => {
        arr.push(item[TextField])
      })
      return arr
    },
    change (value, index, text) {
      this.$emit('change',
        value,
        index,
        this.KeyWord,
        this.field,
        this.selectNameData
      )
    }
  },
  watch: {
    comboboxdata (newData) {
      this.checkBoboxData(newData)
    },
    value (newValue) {
      this.selectData = newValue
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .cube-select::after, .cube-select_active::after {
    border: 0px solid transparent!important;
  }

</style>
