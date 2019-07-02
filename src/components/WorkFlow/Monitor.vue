<template>
  <transition name="slide">
    <div class="work-flow-monitor">
      <div class="monitor-header-content">
        <div class="header-item">
          <span class="name">流程名称:</span>
          <span class="text">{{ ResultInfo.WorkFlowName }}</span>
        </div>
        <div class="header-item">
          <span class="name">流转状态:</span>
          <span class="text">{{ ResultInfo.RecordStatusName }}</span>
        </div>
      </div>
      <line-break></line-break>
      <div class="monitor-history-content">
        <h1 class="history-title">流转历史:</h1>
        <ul v-if="HistoryMind.length > 0" class="history-lists">
          <li
            class="history-list"
            v-if="!item.IsHidden"
            v-for="(item, index) in HistoryMind"
            :key="index"
            >
            <div class="list-inner">
              <div class="history-unit-title">
                <div class="tag"></div>
                <div class="date-time">
                  {{ item.MindDate }}
                </div>
                <div class="flow-operate">
                  {{ formatFlowOperate(item) }}
                </div>
              </div>
              <div class="history-unit-content">
                <div class="unit-item unit-role">
                  <div class="name">{{ item.DeptPositionName }}:</div>
                  <div class="text">{{ item.UserName }}</div>
                </div>
                <div v-if="item.ActName !== '结束'" class="unit-item unit-content">
                  <div class="name">意见:</div>
                  <div class="text">{{ formatInboxStatus(item) }} {{ item.Content }}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <loading v-model="mx_isLoading"></loading>
      <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">{{ afterSaveMsg }}</toast>
      <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import LineBreak from 'base/line/line.vue'
import { commonComponentMixin } from 'common/js/mixin.js'
import { FlowAction } from 'api/index.js'
import { EFlowInboxStatus, EFlowOperate } from 'common/js/config.js'

export default {
  name: 'workflow',
  mixins: [commonComponentMixin],
  data () {
    return {
      query: {},
      ResultInfo: {},
      HistoryMind: [],
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
    this.loadMonitor()
  },
  methods: {
    // 获取流程数据
    loadMonitor () {
      this.getQuery()
      let query = this.query
      let params = Object.assign({}, {
        SubOperate: 'ReadConfig',
        FlowOperate: query.flowOperate,
        Current: {
          WorkInfoID: query.WorkInfoID
        }
      })

      this.MinXinHttpFetch(FlowAction(JSON.stringify(params)), (response) => {
        if (response.success) {
          let value = response.data.value
          if (value.ResultInfo) {
            this.ResultInfo = value.ResultInfo
            this.HistoryMind = this.ResultInfo.HistoryMind
          }
        }
      })
    },
    // 节点的发送的指令
    formatFlowOperate (node) {
      let ActName = node.ActName
      let value = ""
      switch (node.FlowOperate) {
        case EFlowOperate.Active:
          value = '送审'
          break
        case EFlowOperate.Send:
          value = '同意'
          break
        case EFlowOperate.GetBack:
          value = '回收'
          break
        case EFlowOperate.Return:
          value = '驳回'
          break
        case EFlowOperate.Stop:
          value = '终止'
          break
        case EFlowOperate.CheckOut:
          value = '等候签收'
          break
        case EFlowOperate.Delegate:
          if (!node.IsReturnDelegateRoot) {
            value = '委派'
          } else {
            value = '委派返回'
          }
          break
        default:
          value = ''
      }

      if (ActName === '开始' || ActName === '结束') {
        return `${value}(${ActName})`
      } else {
        return value
      }
    },
    // 节点的状态
    formatInboxStatus (node) {
      switch (node.InboxStatus) {
        case EFlowInboxStatus.WaitingSign:
          return '(等候签收)'
        case EFlowInboxStatus.Hidden:
          return '(隐藏等候中)'
        case EFlowInboxStatus.Normal:
          return '(正在处理)'
        case EFlowInboxStatus.WorkEnd:
          return '(已提交)'
        case 70:
          return '(自动跳过)'
        default:
          return ''
      }
    },
    // 获取路由中的参数
    getQuery () {
      let query = this.$router.history.current.query
      if (query) {
        this.query = Object.assign({}, query)
      }
    }
  },
  components: {
    LineBreak
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .work-flow-monitor {
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
    .monitor-header-content {
      padding: 10px 0 10px 0;
      background-color: #ffffff;
      .header-item {
        padding: 5px 10px;
        .name {
          color: #295AA6;
          font-size: 14px;
        }
        .text {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
    .monitor-history-content {
      height: calc(100% - 82px);
      background-color: #ffffff;
      padding: 5px 10px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .history-title {
        font-size: 14px;
        padding: 10px 0;
        color: #295AA6;
        border-bottom: 1px solid #dddddd;
      }
      .history-lists {
        padding: 10px 0 20px 0;
        .history-list {
          .list-inner {
            width: 95%;
            margin: 0 auto;
            .history-unit-title {
              width: 100%;
              padding: 5px 0;
              position: relative;
              color: rgba(0, 0, 0, 0.7);
              font-size: 14px;
              display: flex;
              .tag {
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #0AB9F5;
                top: 50%;
                left: 0px;
                transform: translate(-50%, -50%);
              }
              .date-time {
                flex: 1;
                padding: 0 15px;
              }
              .flow-operate {
                flex: 0 0 100px;
                text-align: right;
              }
            }
            .history-unit-content {
              border-left: 1px solid #dddddd;
              padding: 0 0 0 15px;
              .unit-item {
                display: flex;
                font-size: 13px;
                padding: 10px 0;
              }
            }
          }
        }
      }
    }
  }
</style>
