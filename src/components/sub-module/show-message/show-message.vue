<template>
  <transition name="slide">
    <div class="show-message">
      <div class="message-content-datels">
        <div class="content-header">
          <h1 class="title">
            <span class="name font-color-active">消息标题:</span>
            <span class="text">{{ currentMessage.Title }}</span>
          </h1>
          <div class="main-content">
            <div class="message-row">
              <h1 class="name font-color-active">消息内容:</h1>
              <div class="text">{{ currentMessage.HtmlPath }}</div>
            </div>
          </div>
        </div>
        <div class="content-footer">
          <div class="message-row">
            <span class="name font-color-active">发起人员:</span>
            <span class="text">{{ currentMessage.FromHumanName }}</span>
          </div>
          <div class="message-row">
            <span class="name font-color-active">所属项目:</span>
            <span class="text">{{ currentMessage.EpsProjName }}</span>
          </div>
          <div class="message-row">
            <span class="name font-color-active">发送日期:</span>
            <span class="text">{{ _formatDate(currentMessage.wfDate) }}</span>
          </div>
        </div>
      </div>
      <div @click="back" class="back-btn">
        <span class="fa fa-reply"></span>
      </div>

      <loading v-model="mx_isLoading"></loading>
      <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">已读</toast>
      <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { commonComponentMixin } from 'common/js/mixin.js'
import { formatDate } from 'common/js/Util.js'
import { AlterNotifyMsg } from 'api/index.js'

export default {
  mixins: [commonComponentMixin],
  data () {
    return {
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  computed: {
    ...mapGetters([
      'currentMessage'
    ])
  },
  mounted () {
    this.hasRead(this.currentMessage)
  },
  methods: {
    // 标记已读
    hasRead (item) {
      if (!item.Id) {
        return false
      }

      if (item.IsPowerMessage === 3) {
        return false
      }

      this.MinXinHttpFetch(AlterNotifyMsg(item.Id), (response) => {
        if (response.success) {
          this.mx_toastShow = true
        }
      })
    },
    // 返回
    back () {
      this.$router.push('/business')
    },
    // 期日格式化
    _formatDate (date) {
      if (!date) {
        return ''
      }
      return formatDate(date, 'yyyy-MM-dd HH:mm:ss')
    }
  }
}
</script>
<style lang="less"  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .show-message {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    background-color: #F7F7F7;
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }

    .message-content-datels {
      width: 90%;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 5px 5px 10px #dddddd;
      .content-header {
        padding: 5px;
        font-size: 15px;
        .title {
          padding: 10px 0;
          border-bottom: 1px dotted #dddddd;
          .text {
            color: rgba(0, 0, 0, 0.7);
          }
        }
      }
      .main-content {
        font-size: 15px;
        min-height: 100px;
        .message-row {
          .name {
            padding: 5px 0;
          }
          .text {
            padding: 5px 0;
            color: rgba(0, 0, 0, 0.7);
          }
        }
      }
      .content-footer {
        font-size: 12px;
        padding: 5px;
        background-color: #51BDBD;
        border-radius: 0 0 5px 5px;
        .message-row {
          padding: 5px 0;
          span {
            color: #ffffff;
          }
        }
      }
    }

    .back-btn {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 50%;
      background-color: #dddddd;
      position: absolute;
      right: 20px;
      bottom: 50px;
      color: #ffffff;
      z-index: 120px;
    }
  }
</style>
