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
      <div class="form-content" :style="{'height': formContentHeight + 'px'}">
        <div v-show="_isShow(0)" class="form-content-item mainTable">
          <form class="input-textarea-group">
            <div class="input-row">
              <label class="label-text">主合同编号</label>
              <input v-model="viewDataPool.ContractReviewMain.ContractCode" readonly type="text" class="input" placeholder="主合同编号">
            </div>
            <div class="input-row">
              <label class="label-text">财务编号</label>
              <input v-model="viewDataPool.ContractReviewMain.FinanceNum" type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">项目编号</label>
              <input v-model="viewDataPool.ContractReviewMain.projectApprovalCode" type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">合同状态</label>
              <power-select
                class="input"
                v-model="viewDataPool.ContractReviewMain.ContractStatus"
                :comboboxdata="formAllConfig.comboboxdata"
                KeyWord="ContractReviewMain"
                field="ContractStatus"
                title="合同状态"
                @change="change"
              >
              </power-select>
            </div>
            <div class="input-row">
              <label class="label-text">项目名称(中文)</label>
              <input v-model="viewDataPool.ContractReviewMain.ProjectName" type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">项目名称(英文)</label>
              <input v-model="viewDataPool.ContractReviewMain.EnProjectName" type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">合同名称</label>
              <input v-model="viewDataPool.ContractReviewMain.ContractTitle" type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">投标评审</label>
              <input v-model="viewDataPool.ContractReviewMain.TenderEvaluationCode" type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">业主名称</label>
              <input v-model="viewDataPool.ContractReviewMain.ProjectOwner" type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">合同等额人民币</label>
              <input v-model="viewDataPool.ContractReviewMain.ContractAmountRMB" type="number" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">项目开发人员</label>
              <input v-model="viewDataPool.ContractReviewMain.ResponsiblePerson" type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">评审类型</label>
              <power-select
                class="input"
                v-model="viewDataPool.ContractReviewMain.ProjectArea"
                :comboboxdata="formAllConfig.comboboxdata"
                KeyWord="ContractReviewMain"
                field="ProjectArea"
                title="评审类型"
                @change="change"
              >
              </power-select>
            </div>
            <div class="input-row">
              <label class="label-text">评审方式</label>
              <input v-model="viewDataPool.ContractReviewMain.ReviewMode" type="text" class="input" placeholder="">
              <power-select
                class="input"
                v-model="viewDataPool.ContractReviewMain.ReviewMode"
                :comboboxdata="formAllConfig.comboboxdata"
                KeyWord="ContractReviewMain"
                field="ReviewMode"
                title="评审方式"
                @change="change"
              >
              </power-select>
            </div>
            <div class="input-row">
              <label class="label-text">部门名称</label>
              <input v-model="viewDataPool.ContractReviewMain.TrackingDepartment" type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">部门编码</label>
              <input v-model="viewDataPool.ContractReviewMain.DeptsCode" type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">项目开发状态</label>
              <input v-model="viewDataPool.ContractReviewMain.ProjectStatus" type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">表单状态</label>
              <power-select
                class="input"
                v-model="viewDataPool.ContractReviewMain.Status"
                :comboboxdata="formAllConfig.comboboxdata"
                KeyWord="ContractReviewMain"
                field="Status"
                title="表单状态"
                @change="change"
              >
              </power-select>
            </div>
            <div class="input-row">
              <label class="label-text">是否审批</label>
              <power-select
                class="input"
                v-model="viewDataPool.ContractReviewMain.IsReview"
                :comboboxdata="formAllConfig.comboboxdata"
                KeyWord="ContractReviewMain"
                field="IsReview"
                title="是否审批"
                @change="change"
              >
              </power-select>
            </div>
            <div class="input-row">
              <label class="label-text">是否完成复审</label>
              <power-select
                class="input"
                v-model="viewDataPool.ContractReviewMain.IsCompleteReview"
                :comboboxdata="formAllConfig.comboboxdata"
                KeyWord="ContractReviewMain"
                field="IsCompleteReview"
                title="是否完成复审"
                @change="change"
              >
              </power-select>
            </div>
            <div class="input-row">
              <label class="label-text">录入人</label>
              <input v-model="viewDataPool.ContractReviewMain.RegHumName" readonly type="text" class="input" placeholder="">
            </div>
            <div class="input-row">
              <label class="label-text">录入日期</label>
              <input @click="showDataPicker" v-model="viewDataPool.ContractReviewMain.RegDate" readonly type="text" class="input" placeholder="录入日期">
            </div>

            <div class="textarea-row">
              <label class="label-text">项目跟踪情况</label>
              <group class="textarea-content">
                <x-textarea v-model="viewDataPool.ContractReviewMain.Remark" :max="200" name="description"></x-textarea>
              </group>
            </div>
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
            :data="viewDataPool.CHMC_ReviewCurrencySum"
            :formAllConfig="formAllConfig"
            :winConfig="winConfig"
            @saveChildFrom="_BusinessDataLoad(winConfig)"
          ></contract-currency>
        </div>
        <div v-show="_isShow(2)"  class="form-content-item child-table">
          <review-project
            KeyWord="CHMC_MainReviewContent"
            :KeyValue="routerParams.Id"
            :data="viewDataPool.CHMC_MainReviewContent"
            :formAllConfig="formAllConfig"
            :winConfig="winConfig"
            @saveChildFrom="_BusinessDataLoad(winConfig)"
          ></review-project>
        </div>
        <div v-show="_isShow(3)"  class="form-content-item child-table">
          <deviation-specification
            KeyWord="CHMC_ContractReviewDeviation"
            :KeyValue="routerParams.Id"
            :data="viewDataPool.CHMC_ContractReviewDeviation"
            :formAllConfig="formAllConfig"
            :winConfig="winConfig"
            @saveChildFrom="_BusinessDataLoad(winConfig)"
          ></deviation-specification>
        </div>
        <div v-show="_isShow(4)"  class="form-content-item child-table">
          <risk-assessment
            KeyWord="CHMC_ProjectRiskAssess"
            :KeyValue="routerParams.Id"
            :data="viewDataPool.CHMC_ProjectRiskAssess"
            :formAllConfig="formAllConfig"
            :winConfig="winConfig"
            @saveChildFrom="_BusinessDataLoad(winConfig)"
          ></risk-assessment>
        </div>
        <div v-show="_isShow(5)"  class="form-content-item child-table">
          <profit-analysis
            KeyWord="CHMC_MainCostProfit"
            :KeyValue="routerParams.Id"
            :data="viewDataPool.CHMC_MainCostProfit"
            :formAllConfig="formAllConfig"
            :winConfig="winConfig"
            @saveChildFrom="_BusinessDataLoad(winConfig)"
          ></profit-analysis>
        </div>
        <div v-show="_isShow(6)"  class="form-content-item child-table">
          <opening-record
          KeyWord="CHMC_ContractMainBid"
          :KeyValue="routerParams.Id"
          :data="viewDataPool.CHMC_ContractMainBid"
          :formAllConfig="formAllConfig"
          :winConfig="winConfig"
          @saveChildFrom="_BusinessDataLoad(winConfig)"
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
  formatFromDataToSave
} from 'common/js/Util.js'

// http api
import {
  MenuWidget,
  FormLoad,
  FormInit,
  FormSave2,
  BusinessDataLoad
} from 'api/index.js'

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
      formContentHeight: 200,
      direction: DIRICTION_H,
      tabUnitWidth: 120,
      computedWidth: {
        width: '400px'
      },
      actionMenuShow: false,
      actionMenu: [{
        label: '终止'
      }, {
        label: '撤回'
      }, {
        label: '委派'
      }, {
        label: '送审'
      }, {
        label: '保存',
        value: 'SaveForm'
      }],
      winConfig: {},
      formAllConfig: {},
      viewDataPool: {
        ContractReviewMain: {},
        CHMC_ReviewCurrencySum: [],
        CHMC_MainReviewContent: [],
        CHMC_ContractReviewDeviation: [],
        CHMC_ContractMainBid: [],
        CHMC_ProjectRiskAssess: [],
        CHMC_MainCostProfit: []
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
    this.getFormContentHeight()

    this._MenuWidget(() => {
      this._FormInit(this.winConfig, () => {
        this._FormMainLoad(this.winConfig)

        let formstate = this.routerParams.formstate
        if (formstate !== 'add') {
          this._BusinessDataLoad(this.winConfig)
        }
      })
    })
  },
  methods: {
    // 保存主表
    saveFromData () {
      let params = {
        JsonData: '',
        FormId: ''
      }
      let KeyWord = this.winConfig.joindata.KeyWord
      let obj = {}
      let objItem = formatFromDataToSave(
        this.formAllConfig.comboboxdata,
        this.viewDataPool[KeyWord],
        KeyWord
      )
      obj[KeyWord] = {
        KeyWordType: 'BO',
        data: []
      }
      let formstate = this.routerParams.formstate
      if (formstate === 'edit') {
        objItem['_state'] = 'modified'
      } else if (formstate === 'add') {
        objItem['_state'] = 'added'
      }
      obj[KeyWord].data.push(objItem)
      params.JsonData = JSON.stringify(obj)
      params.FormId = this.winConfig.openformid
      this.MinXinHttpFetch(FormSave2(params), (response) => {
        if (response.success) {
          this.mx_toastShow = true
          if (formstate === 'add') {
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
        // console.log(this.formAllConfig)

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
    // 获取所有子表的数据
    _BusinessDataLoad (winConfig) {
      let params = {
        KeyWord: winConfig.joindata.KeyWord,
        KeyValue: this.routerParams.Id
      }
      this.MinXinHttpFetch(BusinessDataLoad(params), (response) => {
        let getData = response.data.value
        this.viewDataPool.CHMC_ReviewCurrencySum = getData.CHMC_ReviewCurrencySum.concat()
        this.viewDataPool.CHMC_MainReviewContent = getData.CHMC_MainReviewContent.concat()
        this.viewDataPool.CHMC_ContractReviewDeviation = getData.CHMC_ContractReviewDeviation.concat()
        this.viewDataPool.CHMC_ContractMainBid = getData.CHMC_ContractMainBid.concat()
        this.viewDataPool.CHMC_ProjectRiskAssess = getData.CHMC_ProjectRiskAssess.concat()
        this.viewDataPool.CHMC_MainCostProfit = getData.CHMC_MainCostProfit.concat()

        console.log(getData)
        console.log(this.viewDataPool)
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
    // 下来框改变数据
    change (value, index, KeyWord, field, selectNameData) {
      this.viewDataPool.ContractReviewMain[field] = value
    },
    selectActionMenu (key, item) {
      // 如果点击取消，返回false
      if (!item) {
        return false
      }
      if (item.value && item.value === 'SaveForm') {
        this.saveFromData()
      }
    },
    showActionMenu () {
      this.actionMenuShow = true
    },
    switchItem (index) {
      if (index === 7) {
        this._fileAttachLoad()
      }
      this.currentIndex = index
    },
    getFormContentHeight () {
      if (this.timerResize) {
        clearTimeout(this.timerResize)
      }
      this.timerResize = setTimeout(() => {
        this._formContentHeight()
      }, 200)

      this._resize()
    },
    _formatStatus (Status) {
      if (Status === '0') {
        return '新增'
      }
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
    },
    _formContentHeight () {
      this.$nextTick(() => {
        this.formContentHeight =
        this.$refs.mainForm.offsetHeight -
        this.$refs.headerBar.offsetHeight
      })
    },
    _resize () {
      window.addEventListener('resize', () => {
        this._formContentHeight()
      })
    }
  },
  components: {
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
