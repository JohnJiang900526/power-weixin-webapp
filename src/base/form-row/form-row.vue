<template>
  <div class="form-row">
    <div v-if="type === 'text'" class="input-row input">
      <label for="input框 text类型" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="text"
        class="input-text"
        contenteditable="true"
        v-model="rowValue"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'number'" class="input-row input">
      <label for="input框 number类型" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="number"
        class="input-text"
        contenteditable="true"
        v-model="rowValue"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'money'" class="input-row input">
      <label for="input框 money类型" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="text"
        class="input-text"
        contenteditable="true"
        v-model="rowValue"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'rate'" class="input-row input">
      <label for="input框 rate" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="text"
        class="input-text"
        contenteditable="true"
        v-model="rowValue"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'percent'" class="input-row input">
      <label for="input框 percent类型" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="text"
        class="input-text"
        contenteditable="true"
        v-model="rowValue"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'checkBox'" class="input-row input">
      <label for="input框 checkBox类型" class="label-text">{{ label }}</label>
      <div @click="changeCheckBox" class="input">
        <check-icon class="input-text" :checked="rowValue === '1'"></check-icon>
      </div>
    </div>

    <div v-if="type === 'datePicker'" class="input-row datePicker">
      <label for="input框 datePicker类型" class="label-text">{{ label }}</label>
      <div class="input">
        <input
        type="text"
        class="input-text"
        contenteditable="true"
        @click="showDatePicker"
        v-model="rowValue"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        :placeholder="placeholder">
      </div>
    </div>

    <div v-if="type === 'select'" class="input-row select">
      <label for="移动端下拉框 select类型" class="label-text">{{ label }}</label>
      <power-select
        class="input"
        v-model="rowValue"
        :comboboxdata="comboboxdata"
        :KeyWord="KeyWord"
        :field="field"
        :title="label"
        :readonly="readonly"
        :required="required"
        :disabled="canEdit"
        @change="change"
      >
      </power-select>
    </div>

    <div v-if="type === 'textarea'" class="textarea-row textarea">
      <label for="移动端多文本框 textarea类型" class="label-text">{{ label }}</label>
      <group class="textarea-content">
        <x-textarea
          name="description"
          contenteditable="true"
          v-model="rowValue"
          :disabled="canEdit"
          :readonly="readonly"
          :required="required"
          :placeholder="placeholder"
        ></x-textarea>
      </group>
    </div>

    <date-picker v-if="type === 'datePicker'" class="data-picker" ref="updateDataPicker"
      :min="dataPicker.min"
      :max="dataPicker.max"
      :value="dataPicker.value"
      :title="dataPicker.title"
      :format="dataPicker.dateShowFormat"
      @select="selectDatePicker"
    >
    </date-picker>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { PowerSelect } from 'components/index.js'
import { DatePicker } from 'cube-ui'
import { formatDate, toThousand, formatNumber, formatWebToView } from 'common/js/Util.js'
import { XTextarea, Group } from 'vux'
import CheckIcon from 'base/check-icon/check-icon.vue'

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
    disabled: {
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
    mainformData: {
      type: Object,
      default () {
        return {}
      }
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    ToFixed: {
      type: Number,
      default: 2
    },
    placeholder: {
      type: String,
      default: ''
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
      rowValue: '',
      canEdit: true,
      dataPicker: {
        title: '日期',
        min: new Date(1920, 1, 1),
        max: new Date(2100, 12, 30),
        value: new Date(),
        dateShowFormat: {year: 'YYYY', month: 'MM', date: 'DD'}
      }
    }
  },
  computed: {
    ...mapGetters([
      'formStatus'
    ])
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      this.$nextTick(() => {
        let value = this.mainformData[this.field]

        if (this.readonly || this.disabled || this.formStatus === 'view') {
          this.canEdit = true
        }

        switch (this.type) {
          case 'datePicker':
            this.rowValue = formatDate(value)
            break
          case 'number':
            if (!value || value === '') {
              value = 0
            }
            this.rowValue = parseFloat(value).toFixed(2)
            break
          case 'money':
            if (!value || value === '') {
              value = 0
            }

            this.rowValue = value = toThousand(value)
            break
          case 'percent':
            if (!value || value === '') {
              value = 0
            }
            this.rowValue = parseFloat(Number(value) * 100).toFixed(this.ToFixed || 2) + '%'
            break
          case 'rate':
            if (!value || value === '') {
              value = 0
            }

            value += ''

            let main = value.split('.')[0]
            let tail = value.split('.')[1]

            this.rowValue = `${toThousand(main, true)}.${formatNumber(tail, 8)}`
            break
          default:
            this.rowValue = this.textSelectHandle(value)
        }
      })
    },
    // 处理特使text select
    textSelectHandle (value) {
      let comboboxdata = this.comboboxdata
      let selectItem = comboboxdata[`${this.KeyWord}.${this.field}`]

      if (selectItem) {
        return formatWebToView(selectItem, value)
      } else {
        return value
      }
    },
    change (value) {
      this.rowValue = value
    },
    //
    changeCheckBox () {
      if (this.readonly === true || this.disabled === true) {
        return false
      }

      let checked = this.rowValue === '1'

      if (checked) {
        this.rowValue = '0'
      } else {
        this.rowValue = '1'
      }
    },
    // 打开日期面板
    showDatePicker () {
      if (this.disabled || this.readonly) {
        return false
      } else {
        this.$refs.updateDataPicker.show()
      }
    },
    // 选中日期面板数据
    selectDatePicker (selectDate) {
      this.rowValue = formatDate(selectDate)
    }
  },
  watch: {
    mainformData (mainformData) {
      this.setData()
    },
    rowValue (newRowValue) {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        let item = {
          KeyWord: this.KeyWord,
          field: this.field,
          value: newRowValue
        }

        if (this.type === 'money') {
          let pattern = new RegExp(',', 'gm')
          item.value = newRowValue.replace(pattern, '')
        }

        if (this.type === 'percent') {
          item.value = parseFloat(newRowValue) / 100
        }

        if (this.KeyWord === '') {
          throw Error('your KeyWord is null, set it please')
        }
        if (this.field === '') {
          throw Error('your field is null, set it please')
        }

        this.$emit('enterChange', item)
      }, 500)
    }
  },
  components: {
    PowerSelect,
    XTextarea,
    Group,
    DatePicker,
    CheckIcon
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
        line-height: 40px;
        .input-text {
          width: 95%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          background-color: #FAFAFA;
          &.cube-select_active::after, &.cube-select::after {
            border: none!important;
          }
          padding-right: 10px;
        }
      }
    }
    .textarea-row {
      padding: 0 10px;
      .label-text {
        display: block;
        padding: 10px 0;
        font-size: 10px;
      }
      .textarea-content {
        .weui-cells{
          margin-top: 0;
          textarea {
            font-size: 10px;
            color: rgba(0, 0, 0, 0.6);
          }
        }
      }
    }
  }
</style>
