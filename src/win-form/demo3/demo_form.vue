<template>
  <transition name="slide">
    <div ref="mainForm" class="main-form">
      <header ref="headerBar" class="nav-bar nav-header">
        <nav-list ref="navBarScroll" class="nav-bar-scroll"
          :probe-type="probeType"
          :data="switches"
          :direction="direction"
          :unitWidth="tabUnitWidth"
        >
          <div class="nav-scroll-inner">
            <switches-box @switch="switchItem" :switcheWidth="switcheWidth" :lineHeight="lineHeight" :switches="switches" :currentIndex="currentIndex"></switches-box>
          </div>
        </nav-list>
      </header>
      <div class="form-content">
        <div v-show="_isShow(0)" class="form-content-item mainTable">
          <form class="input-textarea-group">
            <form-row
              label="主合同编号"
              type="text"
              placeholder="请输入合同编号"
              v-model="viewDataPool.ContractReviewMain.ContractCode"
              field="ContractCode"
              KeyWord="ContractReviewMain"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="财务编号"
              type="text"
              placeholder="请输入财务编号"
              field="FinanceNum"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.FinanceNum"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="项目编号"
              type="text"
              placeholder="请输入项目编号"
              field="projectApprovalCode"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.projectApprovalCode"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="合同状态"
              type="select"
              placeholder="合同状态"
              field="ContractStatus"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.ContractStatus"
              :comboboxdata="formAllConfig.comboboxdata"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="项目名称(中文)"
              type="text"
              placeholder="请输入项目名称(中文)"
              field="ProjectName"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.ProjectName"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="项目名称(英文)"
              type="text"
              placeholder="请输入项目名称(英文)"
              field="EnProjectName"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.EnProjectName"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="合同名称"
              type="text"
              placeholder="请输入合同名称"
              field="ContractTitle"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.ContractTitle"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="投标评审"
              type="text"
              placeholder="请输入投标评审"
              field="TenderEvaluationCode"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.TenderEvaluationCode"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="业主名称"
              type="text"
              placeholder="请输入业主名称"
              field="ProjectOwner"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.ProjectOwner"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="合同等额人民币"
              type="text"
              placeholder="￥"
              field="ContractAmountRMB"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.ContractAmountRMB"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="项目开发人员"
              type="text"
              placeholder="请输入项目开发人员"
              field="ResponsiblePerson"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.ResponsiblePerson"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="评审类型"
              type="select"
              placeholder="评审类型"
              field="ProjectArea"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.ProjectArea"
              :comboboxdata="formAllConfig.comboboxdata"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="评审方式"
              type="select"
              placeholder="评审方式"
              field="ReviewMode"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.ReviewMode"
              :comboboxdata="formAllConfig.comboboxdata"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="部门名称"
              type="text"
              placeholder="请输入部门名称"
              field="TrackingDepartment"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.TrackingDepartment"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="部门编码"
              type="text"
              placeholder="请输入部门编码"
              field="DeptsCode"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.DeptsCode"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="项目开发状态"
              type="text"
              placeholder="请输入项目开发状态"
              field="ProjectStatus"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.ProjectStatus"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="表单状态"
              type="select"
              placeholder="请输入表单状态"
              field="Status"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.Status"
              :comboboxdata="formAllConfig.comboboxdata"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="是否审批"
              type="select"
              placeholder="请输入是否审批"
              field="IsReview"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.IsReview"
              :comboboxdata="formAllConfig.comboboxdata"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="是否完成复审"
              type="select"
              placeholder="是否完成复审"
              field="IsCompleteReview"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.IsCompleteReview"
              :comboboxdata="formAllConfig.comboboxdata"
              @enterChange="formRowChange"
            ></form-row>

            <form-row
              label="录入人"
              type="text"
              placeholder="录入人"
              field="RegHumName"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.RegHumName"
              :readonly="true"
              @enterChange="formRowChange"
            ></form-row>

            <div class="input-row">
              <label class="label-text">录入日期</label>
              <input @click="showDataPicker" v-model="viewDataPool.ContractReviewMain.RegDate" readonly type="text" class="input" placeholder="录入日期">
            </div>

            <form-row
              label="项目跟踪情况"
              type="textarea"
              placeholder="项目跟踪情况"
              field="Remark"
              KeyWord="ContractReviewMain"
              v-model="viewDataPool.ContractReviewMain.Remark"
              @enterChange="formRowChange"
            ></form-row>

          </form>
          <div class="form-action-wrap">
           <span @click="showActionMenu">
              <span class="fa fa-bars"></span>
              <span class="action-text">操作</span>
           </span>
          </div>
        </div>
        <div v-show="_isShow(1)"  class="form-content-item child-table">
          <contract-currency
            KeyWord="CHMC_ReviewCurrencySum"
            :KeyValue="routerParams.Id"
            :data="viewDataPool.CHMC_ReviewCurrencySum.values"
            :formAllConfig="formAllConfig"
            :winConfig="winConfig"
            @saveChildFrom="_FormData(winConfig)"
          ></contract-currency>
        </div>
        <div v-show="_isShow(2)"  class="form-content-item child-table">
          <review-project
            KeyWord="CHMC_MainReviewContent"
            :KeyValue="routerParams.Id"
            :data="viewDataPool.CHMC_MainReviewContent.values"
            :formAllConfig="formAllConfig"
            :winConfig="winConfig"
            @saveChildFrom="_FormData(winConfig)"
          ></review-project>
        </div>
        <div v-show="_isShow(3)"  class="form-content-item child-table">
          <deviation-specification
            KeyWord="CHMC_ContractReviewDeviation"
            :KeyValue="routerParams.Id"
            :data="viewDataPool.CHMC_ContractReviewDeviation.values"
            :formAllConfig="formAllConfig"
            :winConfig="winConfig"
            @saveChildFrom="_FormData(winConfig)"
          ></deviation-specification>
        </div>
        <div v-show="_isShow(4)"  class="form-content-item child-table">
          <risk-assessment
            KeyWord="CHMC_ProjectRiskAssess"
            :KeyValue="routerParams.Id"
            :data="viewDataPool.CHMC_ProjectRiskAssess.values"
            :formAllConfig="formAllConfig"
            :winConfig="winConfig"
            @saveChildFrom="_FormData(winConfig)"
          ></risk-assessment>
        </div>
        <div v-show="_isShow(5)"  class="form-content-item child-table">
          <profit-analysis
            KeyWord="CHMC_MainCostProfit"
            :KeyValue="routerParams.Id"
            :data="viewDataPool.CHMC_MainCostProfit.values"
            :formAllConfig="formAllConfig"
            :winConfig="winConfig"
            @saveChildFrom="_FormData(winConfig)"
          ></profit-analysis>
        </div>
        <div v-show="_isShow(6)"  class="form-content-item child-table">
          <opening-record
          KeyWord="CHMC_ContractMainBid"
          :KeyValue="routerParams.Id"
          :data="viewDataPool.CHMC_ContractMainBid.values"
          :formAllConfig="formAllConfig"
          :winConfig="winConfig"
          @saveChildFrom="_FormData(winConfig)"
          ></opening-record>
        </div>
        <div v-show="_isShow(7)" class="form-content-item file-attach">
          <file-attach ref="fileAttach"></file-attach>
        </div>
        <div v-show="_isShow(8)" class="form-content-item">
          <report></report>
        </div>
        <div v-show="_isShow(9)" class="form-content-item">
          <comment></comment>
        </div>
      </div>

      <actionsheet
        v-model="actionMenuShow"
        :menus="actionMenu"
        show-cancel
        @on-click-menu="selectActionMenu"
      ></actionsheet>
      <date-picker class="data-picker" ref="updateDataPicker"
        :min="dataPicker.min"
        :max="dataPicker.max"
        :value="dataPicker.value"
        :title="dataPicker.title"
        :format="dataPicker.dateShowFormat"
        @select="selectDatePicker"
      >
      </date-picker>
      <loading v-model="mx_isLoading"></loading>
      <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">保存成功</toast>
      <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
// 引入子表组件
import {
  ContractCurrency,
  ReviewProject,
  DeviationSpecification,
  RiskAssessment,
  ProfitAnalysis,
  OpeningRecord
} from './index.js'

import { commonComponentMixin, formComponentMixin } from 'common/js/mixin.js'

import {
  getMenuId,
  formatDate,
  formatFormAllConfig,
  formatFromDataToView,
  formatFromDataToSave,
  organizeParams
} from 'common/js/Util.js'

// http api
import {
  MenuWidget,
  FormLoad,
  FormInit,
  FormSave,
  FormData
} from 'api/index.js'

import FormRow from 'base/form-row/form-row.vue'

const DIRICTION_H = 'horizontal'

export default {
  mixins: [commonComponentMixin, formComponentMixin],
  data () {
    return {
      currentIndex: 0,
      lineHeight: 1.5,
      switches: [
        {
          name: '基本信息'
        },
        {
          name: '合同价格和币种'
        },
        {
          name: '评审内容'
        },
        {
          name: '偏差说明'
        },
        {
          name: '项目风险评估'
        },
        {
          name: '成本利润分析'
        },
        {
          name: '开标记录'
        },
        {
          name: '附件'
        }
        // {
        //   name: '报表'
        // },
        // {
        //   name: '评论'
        // }
      ],
      direction: DIRICTION_H,
      tabUnitWidth: 120,
      computedWidth: {
        width: '400px'
      },
      winConfig: {},
      formAllConfig: {},
      viewDataPool: {
        ContractReviewMain: {},
        CHMC_ReviewCurrencySum: {},
        CHMC_MainReviewContent: {},
        CHMC_ContractReviewDeviation: {},
        CHMC_ContractMainBid: {},
        CHMC_ProjectRiskAssess: {},
        CHMC_MainCostProfit: {}
      },
      dataPicker: {
        title: '日期',
        min: new Date(1900, 1, 1),
        max: new Date(2100, 12, 30),
        value: new Date(),
        dateShowFormat: {year: 'YYYY', month: 'MM', date: 'DD'}
      },
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  computed: {
    switcheWidth () {
      return this.tabUnitWidth * this.switches.length + 'px'
    }
  },
  created () {
    this.probeType = 1

    this.routerParams = this.$router.history.current.params
  },
  mounted () {
    this._MenuWidget(() => {
      this._FormInit(this.winConfig, () => {
        this._FormMainLoad(this.winConfig)

        let formstate = this.routerParams.formstate
        if (formstate !== 'add') {
          this._FormData(this.winConfig)
        }
      })
    })
  },
  methods: {
    formRowChange (item) {
      this.viewDataPool[item.KeyWord][item.field] = item.value
    },
    // 保存主表
    saveFromData () {
      let KeyWord = this.winConfig.joindata.KeyWord
      let formDate = this.routerParams.formstate
      let objItem = formatFromDataToSave(
        this.formAllConfig.comboboxdata,
        this.viewDataPool[KeyWord],
        KeyWord
      )
      let obj = {
        KeyWord: KeyWord,
        formAllConfig: this.formAllConfig,
        KeyWordType: 'BO',
        data: [objItem],
        formDate: formDate,
        FormId: this.winConfig.openformid
      }
      let params = organizeParams(obj)
      this.MinXinHttpFetch(FormSave(params), (response) => {
        if (response.success) {
          this.mx_toastShow = true
          if (formDate === 'add') {
            this.$router.back()
          }
        }
      })
    },
    // 获取窗体配置信息数据
    _MenuWidget (callback) {
      this.MenuId = getMenuId(this.$router)
      this.MinXinHttpFetch(MenuWidget(this.MenuId), (response) => {
        let value = response.data.value
        this.winConfig = JSON.parse(value[0].ExtJson).config
        // console.log(this.winConfig)
        if (callback) {
          callback()
        }
      })
    },
    // 获取表单的配置信息
    _FormInit (winConfig, callback) {
      let KeyValue = this.routerParams.Id
      let formstate = this.routerParams.formstate
      if (formstate === 'add') {
        KeyValue = ''
      }
      let params = {
        FormId: winConfig.openformid,
        KeyValue: KeyValue,
        FormState: formstate
      }
      this.MinXinHttpFetch(FormInit(params), (response) => {
        let obj = Object.assign({}, response.data)
        this.formAllConfig = formatFormAllConfig(obj)
        console.log(this.formAllConfig)

        if (callback) {
          callback()
        }
      })
    },
    // 加载主表数据
    _FormMainLoad (winConfig) {
      let KeyValue = this.routerParams.Id
      let formstate = this.routerParams.formstate
      if (formstate === 'add') {
        KeyValue = ''
      }
      let params = {
        KeyWord: winConfig.joindata.KeyWord,
        KeyValue: KeyValue,
        KeyWordType: 'BO',
        swhere: '',
        select: '',
        formstate: formstate
      }
      this.MinXinHttpFetch(FormLoad(params), (response) => {
        let value = response.data.value
        let getData = JSON.parse(value)
        if (value || value !== '') {
          this.viewDataPool.ContractReviewMain = formatFromDataToView(
            this.formAllConfig.comboboxdata,
            getData,
            winConfig.joindata.KeyWord
          )
        }
      })
    },
    // 获取表单的所有子表信息
    _FormData (winConfig) {
      let params = {
        FormId: winConfig.openformid,
        KeyValue: this.routerParams.Id,
        extparams: ''
      }
      this.MinXinHttpFetch(FormData(params), (response) => {
        let getData = response.data.value
        let childrenData = getData.children

        childrenData.forEach((item, index) => {
          this.viewDataPool[item.KeyWord] = Object.assign({}, item)
        })
      })
    },
    // 打开日期面板
    showDataPicker () {
      this.$refs.updateDataPicker.show()
    },
    // 选中日期面板数据
    selectDatePicker (selectDate) {
      this.viewDataPool.ContractReviewMain.RegDate = formatDate(selectDate)
    },
    // 下拉框改变数据
    change (value, index, KeyWord, field, selectNameData) {
      this.viewDataPool.ContractReviewMain[field] = value
    },
    // selectAction中的驱动事件
    selectActionMenu (key, item) {
      // 如果点击取消，返回false
      if (!item) {
        return false
      }
      if (item.value && item.value === 'SaveForm') {
        this.saveFromData()
      }
    },
    switchItem (index) {
      if (index === 7) {
        this._fileAttachLoad()
      }
      this.currentIndex = index
    },
    // 显示附件页面后 执行加载附件
    _fileAttachLoad () {
      this.$refs.fileAttach.GetDocFilesLoad(
        this.winConfig.joindata.KeyWord,
        this.routerParams.Id
      )
    },
    _isShow (index) {
      return this.currentIndex === index
    }
  },
  components: {
    FormRow,
    ContractCurrency,
    ReviewProject,
    DeviationSpecification,
    RiskAssessment,
    ProfitAnalysis,
    OpeningRecord
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .main-form {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background-color: #f4f4f4;
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0)
    }
    .nav-bar {
      display: block;
      border-bottom: 1px solid #dddddd;
      &.nav-header {
        height: auto;
      }
      .nav-bar-scroll{
        width: 100%;
        position: relative;
        height: auto;
      }
    }
    .form-content{
      display: block;
      height: calc(100% - 38px);
      .form-content-item {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        &.mainTable {
          .input-textarea-group {
            height: calc(100% - 50px);
            padding: 10px 0;
            overflow-y: auto;
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
          .form-action-wrap{
            .top-line();
            text-align: center;
            line-height: 50px;
            color: #295AA6;
          }
        }
      }
    }
  }
</style>
