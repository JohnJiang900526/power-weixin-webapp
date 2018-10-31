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
          <tree-grid ref="formListUnit"
            v-if="tableLists.length > 0"
            v-for="item in tableLists"
            :key="item.Id"
            :item="item"
            :showCheckBox="showCheckBox"
            :levelNum="0"
            :option="option"
            :tableType="tableType"
            @selectItemView="selectItemView"
            @selectItem="_selectItem"
            @unSelectItem="_unSelectItem"
            @hideCheckBox="hideCheckBox"
          ></tree-grid>
        </ul>
      </form>
      <footer-bar
        v-if="false"
        @Add="_add"
        @preDelete="_preDelete"
        @Delete="_delete"
        @backPre="_backPre"
      ></footer-bar>
    </div>
    <div class="chile-table-lists-form" :style="{'transform': 'translate3d(' + this.offset + '%, 0, 0)'}">
      <form class="input-textarea-group">
        <form-row
          v-if="tableShowField.length > 0"
          v-for="(fieldItem, fieldIndex) in tableShowField"
          :key="fieldIndex"
          :label="fieldItem.label"
          :type="fieldItem.type"
          :placeholder="fieldItem.placeholder"
          :field="fieldItem.field"
          :KeyWord="KeyWord"
          :mainformData="currentItem"
          :comboboxdata="comboboxdata"
          @enterChange="formRowChange"
        ></form-row>
      </form>
      <div class="footer-actions">
        <div v-if="false" @click="saveFromData" class="action-item">保存</div>
        <div @click="closeEditBlock" class="action-item">关闭</div>
      </div>
    </div>
    <loading v-model="mx_isLoading"></loading>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">{{ mx_toastText }}</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import TreeGrid from 'base/tree-grid/tree-grid.vue'
import { SearchBox, FormList, FooterBar } from 'components/index.js'
import {
  formatDate,
  removeList,
  organizeParams,
  listToTreeData,
  getTableType,
  checkChildTableIsAdded,
  setChildTableData
} from 'common/js/Util.js'

import { commonComponentMixin } from 'common/js/mixin.js'
import {
  FormLoad,
  FormSave,
  Exec
} from 'api/index.js'

import { getStoreUserSession } from 'api/UserSession.js'

import FormRow from 'base/form-row/form-row.vue'

export default {
  mixins: [commonComponentMixin],
  props: {
    KeyValue: {
      type: String,
      default: ''
    },
    comboboxdata: {
      type: Object,
      default () {
        return {}
      }
    },
    formAllConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    chileTableItem: {
      type: Object,
      default () {
        return {}
      }
    },
    tableData: {
      type: Object,
      default () {
        return {}
      }
    },
    mainformData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'routerParams'
    ])
  },
  data () {
    return {
      KeyWord: '',
      showCheckBox: false,
      tagShow: false,
      offset: 100,
      tableLists: [],
      defaultData: [],
      selectItems: [],
      currentItem: {},
      tableShowField: [],
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
      },
      tableType: '',
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_toastText: '',
      mx_deleyTime: 1000
    }
  },
  mounted () {
    // 子表初始化
    this.tableInit()

    this._Exec()
  },
  methods: {
    // 初始化
    tableInit () {
      let formListOption = this.chileTableItem.formListOption
      let textNameOption = formListOption.textNameOption
      let tableType = this.chileTableItem.tableListType

      this.tableShowField = this.chileTableItem.tableShowField
      this.option = Object.assign(this.option, textNameOption)
      this.KeyWord = this.chileTableItem.KeyWord
      this.tableType = getTableType(tableType)
    },
    // 获取自定义数据
    _Exec () {
      let userSession = getStoreUserSession()
      let tableConfig = Object.assign({}, this.chileTableItem)
      let params = Object.assign({}, tableConfig.dataParams)
      let projGuid = params.MethodParams.proj_guid

      if (projGuid === 'EpsProjId') {
        params.MethodParams.proj_guid = userSession[projGuid]
      }

      this.MinXinHttpFetch(Exec(JSON.stringify(params)), (response) => {
        let value = [...response.data.value]
        let treeGridAccording = tableConfig.treeGridAccording

        value.forEach((item, index) => {
          item.Id = item[treeGridAccording.Id]
          item.ParentId = item[treeGridAccording.ParentId]
        })

        this.defaultData = value.concat()
        this.tableLists = this.formatTableLists()
      })
    },
    formRowChange (item) {
      this.currentItem[item.field] = item.value
    },
    // 新增
    _add () {
      this.addFormLoad()
      this.offset = 0
    },
    // 保存当前数据
    saveFromData () {
      let formDate = 'auto'
      let foreignfield = this.chileTableItem.data.foreignfield
      let KeyWordType = this.chileTableItem.KeyWordType
      let isAdded = checkChildTableIsAdded(foreignfield, this.currentItem)

      if (!isAdded) {
        formDate = 'edit'
      } else {
        formDate = 'add'
        if (this.KeyValue === '0000') {
          this.MixinAlertShowEvent('需先保存主表')
          return false
        }
        this.currentItem =
          setChildTableData(foreignfield, this.currentItem, this.mainformData)
      }

      let obj = {
        KeyWord: this.KeyWord,
        formAllConfig: this.formAllConfig,
        KeyWordType: KeyWordType,
        data: [this.currentItem],
        formDate: formDate,
        FormId: this.routerParams.FromId
      }
      let params = organizeParams(obj)
      this.MinXinHttpFetch(FormSave(params), (response) => {
        this.mx_toastText = '保存成功'
        this.mx_toastShow = true
        this.$emit('saveChildFrom')
      })
    },
    // 删除当前选中的数据
    deleteSelectedItems () {
      let formDate = 'delete'
      let obj = {
        KeyWord: this.KeyWord,
        formAllConfig: this.formAllConfig,
        KeyWordType: 'BO',
        data: this.selectItems,
        formDate: formDate,
        FormId: this.routerParams.FromId
      }

      let params = organizeParams(obj)
      this.MinXinHttpFetch(FormSave(params), (response) => {
        this.mx_toastText = '删除成功'
        this.mx_toastShow = true
        this.$emit('saveChildFrom')
        this._backPre()
      })
    },
    // 初始化一条子表记录
    addFormLoad () {
      let params = {
        KeyWord: this.KeyWord,
        KeyValue: '',
        KeyWordType: 'BO',
        swhere: '',
        select: '',
        formstate: 'add'
      }
      this.MinXinHttpFetch(FormLoad(params), (response) => {
        let value = response.data.value
        this.currentItem = JSON.parse(value)
      })
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
    hideCheckBox () {
      this.showCheckBox = true
    },
    // 返回
    _backPre () {
      let formListUnits = this.$refs.formListUnit
      formListUnits.forEach(item => {
        item.backDefault()
      })
      this.showCheckBox = false
      this.selectItems = []
    },
    // 确定删除
    _delete () {
      this.deleteSelectedItems()
    },
    // 删除
    _preDelete () {
      this.showCheckBox = true
    },
    // 选中一条数据的事件
    _selectItem (item) {
      this.selectItems.push(item)
    },
    // 取消选中事件
    _unSelectItem (item) {
      removeList(this.selectItems, item)
    },
    // 关闭面板
    closeEditBlock () {
      this.offset = 100
    },
    _formatDate (date) {
      return formatDate(date)
    },
    formatTableLists () {
      let arr = []
      this.defaultData.forEach((item) => {
        if (!item.ParentId || item.ParentId === '00000000-0000-0000-0000-000000000000') {
          arr.push(item)
        }
      })

      arr.forEach((item) => {
        listToTreeData(item, this.defaultData)
      })

      return arr
    }
  },
  watch: {
    tableData: {
      handler (newData, oldData) {
        if (newData.values) {
          this.defaultData = newData.values.concat()
          this.tableLists = this.formatTableLists()
        }
      },
      immediate: true
    }
  },
  components: {
    SearchBox,
    FormList,
    FooterBar,
    TreeGrid,
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
      display: flex;
      flex-direction: column;
      position: relative;
      .child-main-table {
        width: 100%;
        min-height: 0px;
        flex: 1;
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
                text-align: center;
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
        .nav-bar {
          flex: 0 0 50px;
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
      display: flex;
      flex-direction: column;
      .input-textarea-group {
        min-height: 0px;
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
      }
      .footer-actions {
        min-height: 0;
        flex: 0 0 50px;
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
