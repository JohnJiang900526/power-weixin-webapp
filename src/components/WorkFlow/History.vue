<template>
  <transition name="slide">
    <div class="flow-history-content">
      <div class="flow-history-main">
        <h1 class="title font-color-active">监控历史:</h1>
        <ul class="lists">
          <li class="list"
            v-for="(item, index) in historyList" :key="index"
            @click="openMonitor(item.WorkInfoID)"
            >
            <div class="list-unit-inner">
              <h1 class="title">
                <span class="name font-color-active ">流程名称:</span>
                <span class="text">{{ item.Title }}</span>
              </h1>
              <div class="sub-message">
                <div class="item">
                  <span class="name font-color-active">状态:</span>
                  <span class="text">{{ formatStatus(item.RecordStatus) }}</span>
                </div>
                <div class="item">
                  <span class="name font-color-active">终止人:</span>
                  <span class="text">{{ item.FinishUserName }}</span>
                </div>
              </div>

              <div class="sub-message">
                <div class="item time">
                  <span class="name font-color-active">创建时间:</span>
                  <span class="text">{{ formatDate(item.CreateDate) }}</span>
                </div>
              </div>
              <div class="sub-message">
                <div class="item time">
                  <span class="name font-color-active">完成时间:</span>
                  <span class="text">{{ formatDate(item.FinishDate) }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="flow-history-footer">
        <div @click="goBack" class="item">
          返回
        </div>
      </div>

      <loading v-model="mx_isLoading"></loading>
      <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">{{ afterSaveMsg }}</toast>
      <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { commonComponentMixin } from 'common/js/mixin.js'
import { FormInit } from 'api/index.js'
import { formatDate } from 'common/js/Util.js'

export default {
  mixins: [commonComponentMixin],
  data () {
    return {
      historyList: [],
      afterSaveMsg: '',
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  mounted () {
    this._FormInit()
  },
  methods: {
    // 获取流程数据
    _FormInit () {
      this.getQuery()

      let params = {
        FormId: this.query.FormId,
        KeyValue: this.query.KeyValue,
        FormState: this.query.FormState
      }

      this.MinXinHttpFetch(FormInit(params), (response) => {
        if (response.success) {
          let workflowdata = response.data.workflowdata
          if (workflowdata !== '') {
            workflowdata = JSON.parse(workflowdata)
          }

          let CanFlowOperate = workflowdata.CanFlowOperate
          if (CanFlowOperate) {
            let CanFlowList = CanFlowOperate.CanFlowList

            if (CanFlowList) {
              let ShowHistoryMonitor = CanFlowList.ShowHistoryMonitor

              if (ShowHistoryMonitor.List) {
                this.historyList = ShowHistoryMonitor.List.concat()
              }
            }
          }
        }
      })
    },
    // 查看监控
    openMonitor (WorkInfoID) {
      let query = {
        flowOperate: 'ShowMonitor',
        WorkInfoID: WorkInfoID
      }

      this.$router.push({
        path: '/forkflow/monitor',
        query: query
      })
    },
    // 转换状态
    formatStatus (status) {
      let result = ''

      switch (status) {
        case 'Stop':
          result = '已终止'
          break
        case 'Finish':
          result = '办结'
          break
        case 'Scrap':
          result = '已废弃'
          break
        default:
          result = '流转中'
          break
      }

      return result
    },
    // 日期格式化
    formatDate (date) {
      return formatDate(date, 'yyyy-MM-dd HH:mm:ss')
    },
    // 获取路由中的参数
    getQuery () {
      let query = this.$router.history.current.query
      if (query) {
        this.query = Object.assign({}, query)
      }
    },
    // 返回表单
    goBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  .flow-history-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    background-color: #EBEBEB;
    &.slide-enter-active, &.slide-leave-active{
      transition: all 0.3s
    }
    &.slide-enter, &.slide-leave-to{
      transform: translate3d(100%, 0, 0)
    }
    .flow-history-main {
      width: 100%;
      height: calc(100% - 50px);
      overflow-y: auto;
      .title {
        padding: 10px;
        font-size: 14px;
      }
      .lists {
        padding: 0 5px;
        .list {
          margin-bottom: 10px;
          background-color: #ffffff;
          padding: 5px;
          border-radius: 5px;
          .list-unit-inner {
            .title {
              padding: 5px 0;
              font-size: 14px;
              .text {
                color: rgba(0, 0, 0, 0.6);
              }
            }
            .sub-message {
              padding: 5px 0;
              font-size: 14px;
              display: flex;
              .item {
                min-width: 0px;
                flex: 1;
                &.status {
                  flex: 1;
                }
                &.time {
                  flex: 2;
                }
              }
              .text {
                color: rgba(0, 0, 0, 0.6);
              }
            }
          }
        }
      }
    }
    .flow-history-footer {
      height: 50px;
      line-height: 50px;
      display: flex;
      background-color: #ffffff;
      .top-line();
      .item {
        min-width: 10px;
        flex: 1;
        text-align: center;
        font-size: 14px;
        line-height: 50px;
        border-right: 1px solid #dddddd;
        &:last-child {
          border-right: 0px solid #dddddd;
        }
      }
    }
  }
</style>
