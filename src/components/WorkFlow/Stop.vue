<template>
  <transition name="slide">
    <div class="flow-stop-content">
      <div class="flow-stop-main">
        <h1 class="title font-color-active">提交意见:</h1>
          <group class="textarea-content">
            <x-textarea
              name="description"
              v-model.trim="MindInfo"
              :max="300"
              placeholder="输入提交意见"
            ></x-textarea>
          </group>
      </div>
      <div class="flow-stop-footer">
        <div @click="submitData" class="item">
          提交
        </div>
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
import { XTextarea, Group } from 'vux'
import { commonComponentMixin } from 'common/js/mixin.js'
import { FlowAction } from 'api/index.js'

export default {
  mixins: [commonComponentMixin],
  data () {
    return {
      MindInfo: '',
      formState: '',
      Current: {},
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
    this.getStopFlowData()
  },
  methods: {
    // 提交数据
    submitData () {
      let valid = this.validSubmitData()

      if (!valid.isPass) {
        this.MixinAlertShowEvent(valid.msg)
        return false
      }

      let params = Object.assign({}, {
        Current: this.Current,
        FlowOperate: 'Stop',
        MindInfo: this.MindInfo,
        VoteText: '',
        VoteValue: ''
      })

      this.MinXinHttpFetch(FlowAction(JSON.stringify(params)), (response) => {
        if (response.success) {
          this.afterSaveMsg = '完成提交'
          this.mx_toastShow = true

          if (this.timer) {
            clearTimeout(this.timer)
          }

          this.timer = setTimeout(() => {
            if (this.formState === 'view') {
              this.$router.push('/workinfos')
            } else {
              this.goBack()
            }
          }, 1000)
        }
      })
    },
    // 验证信息
    validSubmitData () {
      let obj = {
        msg: '',
        isPass: true
      }

      if (this.MindInfo === '') {
        obj.msg = '意见不能为空'
        obj.isPass = false
        return obj
      }

      return obj
    },
    // 获取流程数据
    getStopFlowData () {
      this.getQuery()
      let params = Object.assign({}, {
        SubOperate: 'GetCurrentSeque',
        FlowOperate: 'SupplyInstance',
        SequeID: this.query.SequeID,
        Current: this.query
      })

      this.MinXinHttpFetch(FlowAction(JSON.stringify(params)), (response) => {
        if (response.success) {
          let value = response.data.value

          this.Current = Object.assign({}, value.Current)
          this.HistoryMind = value.HistoryMind.concat()
        }
      })
    },
    // 获取路由中的参数
    getQuery () {
      let query = this.$router.history.current.query
      if (query) {
        this.query = Object.assign({}, query)
        this.formState = this.query.FormState
      }
    },
    // 返回表单
    goBack () {
      this.$router.back()
    }
  },
  components: {
    XTextarea,
    Group
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  .flow-stop-content {
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
    .flow-stop-main {
      width: 100%;
      height: calc(100% - 50px);
      overflow-y: auto;
      .title {
        padding: 10px;
        font-size: 14px;
      }
      .weui-cells {
        margin-top: 0px;
        font-size: 14px;
      }
    }
    .flow-stop-footer {
      height: 50px;
      line-height: 50px;
      display: flex;
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
