<template>
  <div class="chile-table-unit">
    <div class="child-main-content">
      <form class="child-main-table">
        <ul class="child-table-lists">
          <li v-if="tableType === 'table'" class="table-title">
            <div class="title-wrap">
              <div v-if="option.title.show" class="title-item">
                <span class="text">{{ option.title.text }}</span>
              </div>
              <div v-if="option.left.show" class="title-item">
                <span class="text">{{ option.left.text }}</span>
              </div>
              <div v-if="option.center.show" class="title-item">
                <span class="text">{{ option.center.text }}</span>
              </div>
              <div v-if="option.right.show" class="title-item">
                <span class="text">{{ option.right.text }}</span>
              </div>
            </div>
          </li>
          <li v-if="tableLists.length"
              class="table-list"
              @click="selectItemView(item)"
              v-for="item in tableLists" :key="item.Id"
            >
            <form-list ref="formListUnit"
              :item="item"
              :option="option"
              :tableType="tableType"
            ></form-list>
          </li>
        </ul>
      </form>
    </div>
    <div class="chile-table-lists-form" :style="{'transform': 'translate3d(' + this.offset + '%, 0, 0)'}">
      <form class="input-textarea-group">
        <form-row
          v-if="tableShowField.length > 0"
          v-for="(fieldItem, fieldIndex) in tableShowField"
          :key="fieldIndex"
          :label="fieldItem.label"
          :type="fieldItem.type"
          :readonly="fieldItem.readonly"
          :required="fieldItem.required"
          :disabled="fieldItem.disabled"
          :placeholder="fieldItem.placeholder"
          :field="fieldItem.field"
          :KeyWord="KeyWord"
          :mainformData="currentItem"
          :comboboxdata="comboboxdata"
          @enterChange="formRowChange"
        ></form-row>
      </form>
      <div class="footer-actions">
        <div @click="closeEditBlock" class="action-item">关闭</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { SearchBox, FormList, FooterBar, FormRow } from 'components/index.js'

export default {
  props: {
    tableTextNameOption: {
      type: Object,
      default () {
        return {}
      }
    },
    tableShowField: {
      type: Array,
      default () {
        return []
      }
    },
    comboboxdata: {
      type: Object,
      default () {
        return {}
      }
    },
    tableType: {
      type: String,
      default: ''
    },
    tableData: {
      type: Object,
      default () {
        return {}
      }
    },
    selectId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      KeyWord: '',
      showCheckBox: false,
      tagShow: false,
      offset: 100,
      defaultLists: [],
      tableLists: [],
      currentItem: {},
      option: {
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
  mounted () {
    this.tableInit()
  },
  methods: {
    // 初始化
    tableInit () {
      this.option = Object.assign(this.option, this.tableTextNameOption)
    },
    formRowChange (item) {
      this.currentItem[item.field] = item.value
    },
    // 查看一条数据
    selectItemView (item) {
      if (this.showCheckBox) {
        return false
      } else {
        this.currentItem = item
        this.offset = 0
      }
    },
    // 获取孙表的数据
    getGrandSon () {
      let arr = []
      let allData = [...this.defaultLists]

      allData.forEach((item) => {
        if (item.PurchaseRequisitions_Id === this.selectId) {
          arr.push(item)
        }
      })

      return arr
    },
    // 关闭面板
    closeEditBlock () {
      this.offset = 100
    }
  },
  watch: {
    tableData: {
      handler (newData, oldData) {
        if (!newData.values) {
          newData.values = []
        }

        if (newData.children) {
          this.KeyWord = newData.children[0].KeyWord
          this.defaultLists = [...newData.children[0].values]
        }
      },
      immediate: true
    },
    selectId: {
      handler (newId, oldId) {
        if (newId) {
          this.tableLists = this.getGrandSon()
          this.option = Object.assign(this.option, this.tableTextNameOption)
        }
      },
      immediate: true
    }
  },
  components: {
    SearchBox,
    FormList,
    FooterBar,
    FormRow
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .chile-table-unit {
    width: 100%;
    height: 100%;
    .child-main-content {
      width: 100%;
      height: 100%;
      position: relative;
      .child-main-table {
        width: 100%;
        height: calc(100% - 50px);
        overflow-y: auto;
        .child-table-lists {
          padding: 0 5px;
          margin-bottom: 10px;
          .table-title {
             margin-top: 10px;
            .title-wrap {
              display: flex;
              background-color: #dddddd;
              .title-item {
                flex: 1;
                min-width: 10px;
                font-size: 13px;
                color: rgba(0, 0, 0, 0.8);
                padding: 5px;
                .css3-ellipsis();
              }
            }
          }
          .table-list {
            margin-top: 10px;
            border-radius: 3px;
            background-color: #ffffff;
          }
        }
      }
    }
    .chile-table-lists-form {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      transition: all 0.3s;
      background-color: #f4f4f4;
      .input-textarea-group {
        height: calc(100% - 50px);
        overflow-y: auto;
        .input-row {
          .input-row();
          .label-text {
            .label-text();
          }
          .input {
            .input();
            &.cube-select_active::after,
            &.cube-select::after {
              border: none !important;
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
            .weui-cells {
              margin-top: 0;
              textarea {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.6);
              }
            }
          }
        }
        .sub-file-attach-warp {
          width: 100%;
          .sub-file-attach-title {
            padding: 10px;
            font-size: 14px;
            .bottom-line();
          }
        }
      }
      .footer-actions {
        .top-line();
        text-align: center;
        display: flex;
        line-height: 50px;
        .action-item {
          min-width: 10px;
          flex: 1;
          color: #295aa6;
          border-right: 1px solid #dddddd;
          &:last-child{
            border-right: 0;
          }
        }
      }
    }
  }
</style>
