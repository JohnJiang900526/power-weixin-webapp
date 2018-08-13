<template>
  <div ref="ReviewProject" class="chile-table-unit">
    <div class="child-main-content">
      <form class="child-main-table">
        <ul class="child-table-lists">
          <li style="display: none;" class="table-list">
            <search-box placeholder="搜索"></search-box>
          </li>
          <li v-if="tableLists.length"
            @click="selectItemView(item)"
            v-for="item in tableLists" :key="item.Id"
            class="table-list">
            <form-list ref="formListUnit"
              :item="item"
              :showCheckBox="showCheckBox"
              :title="item.ReviewProject"
              :left="item.Remark || '暂无'"
              :center="_formatDate(item.UpdDate)"
              :right="item.ReviewContent || '暂无'"
              :tagShow="tagShow"
              @selectItem="_selectItem"
              @unSelectItem="_unSelectItem"
            ></form-list>
          </li>
        </ul>
      </form>
      <footer-bar
        @Add="_add"
        @preDelete="_preDelete"
        @Delete="_delete"
        @backPre="_backPre"
      ></footer-bar>
    </div>
    <div class="chile-table-lists-form" :style="{'transform': 'translate3d(' + this.offset + '%, 0, 0)'}">
      <form class="input-textarea-group">
        <div class="input-row">
          <label class="label-text">评审项目</label>
          <input v-model="currentItem.ReviewProject" type="text" class="input" placeholder="输入评审项目">
        </div>
        <div class="input-row">
          <label class="label-text">评审项目描述</label>
          <input v-model="currentItem.ReviewContent" type="text" class="input" placeholder="输入评审项目描述">
        </div>
      </form>
      <div class="footer-actions">
        <div @click="saveFromData" class="action-item">保存</div>
        <div @click="closeEditBlock" class="action-item">关闭</div>
      </div>
    </div>
    <loading v-model="mx_isLoading"></loading>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">{{ mx_toastText }}</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>
<script type="text/ecmascript-6">
import { SearchBox, FormList, FooterBar } from 'components/index.js'
import { formatDate, removeList, organizeParams } from 'common/js/Util.js'
import { commonComponentMixin } from 'common/js/mixin.js'
import {
  FormLoad,
  FormSave2
} from 'api/index.js'

export default {
  mixins: [commonComponentMixin],
  props: {
    KeyWord: {
      type: String,
      default: ''
    },
    KeyValue: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    formAllConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    winConfig: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showCheckBox: false,
      tagShow: false,
      offset: 100,
      tableLists: [],
      defaultData: [],
      selectItems: [],
      currentItem: {},
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_toastText: '',
      mx_deleyTime: 1000
    }
  },
  methods: {
    // 新增
    _add () {
      this.addFormLoad()
      this.offset = 0
    },
    // 保存当前数据
    saveFromData () {
      let formDate = 'auto'
      if (this.currentItem.ContractReviewMainId) {
        formDate = 'edit'
      } else {
        formDate = 'add'
        if (this.KeyValue === '0000') {
          this.MixinAlertShowEvent('需先保存主表')
          return false
        }
        this.currentItem['ContractReviewMainId'] = this.KeyValue
      }
      let obj = {
        KeyWord: this.KeyWord,
        formAllConfig: this.formAllConfig,
        KeyWordType: 'BO',
        data: [this.currentItem],
        formDate: formDate,
        FormId: this.winConfig.openformid
      }
      let params = organizeParams(obj)
      this.MinXinHttpFetch(FormSave2(params), (response) => {
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
        FormId: this.winConfig.openformid
      }
      let params = organizeParams(obj)
      this.MinXinHttpFetch(FormSave2(params), (response) => {
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
    }
  },
  watch: {
    data (newData) {
      this.tableLists = newData.concat()
      this.defaultData = newData.concat()

      this.tableLists.sort((a, b) => {
        return new Date(b.UpdDate).getTime() - new Date(a.UpdDate).getTime()
      })
    }
  },
  components: {
    SearchBox,
    FormList,
    FooterBar
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
      background-color: #ffffff;
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
