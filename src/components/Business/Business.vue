<template>
  <div ref="businessCenter" class="content-box business-center">
    <cube-sticky
    :pos="scrollY"
    :check-top="checkTop"
    fixed-show-ani="sticky-fixed-show"
    @diff-change="diffChange"
    >
      <cube-scroll
      :scroll-events="scrollEvents"
      @scroll="scrollHandler"
      >
        <div ref="businessHeader" class="business-header">
          <div class="content-logo">
            <img class="content-bg" src="./banner.png">
            <div class="human-message">
              <div class="avatar">
                <img class="header-logo" src="./default-sir.jpg" alt="头像">
              </div>
              <div class="message">
                <p>
                  <span>你好</span>
                  <span class=""></span>
                  <span>{{ UserSession.UserName || "" }}</span>
                </p>
                <p>
                  <span>{{ UserSession.UserCode || "" }}</span>
                </p>
              </div>
            </div>
          </div>
          <cube-sticky-ele>
            <div class="sticky-header">
              <div class="switch-btn">
                <div class="switch-list">
                  <div @click="goToPage('workinfos')" class="text">
                    <span>审批</span>
                    <span v-if="Work !== 0" class="badge">{{ Work }}</span>
                  </div>
                </div>
                <div @click="goToPage('messageinfos')" class="switch-list">
                  <div class="text">
                    <span>消息</span>
                    <span v-if="Message !== 0" class="badge">{{ Message }}</span>
                  </div>
                </div>
                <div @click="goToPage('notifyInfos')" class="switch-list">
                  <div class="text">
                    <span>通知</span>
                    <span v-if="Notify !== 0" class="badge">{{ Notify }}</span>
                  </div>
                </div>
              </div>
              <line-break></line-break>
            </div>
          </cube-sticky-ele>
        </div>
        <div ref="businessContent" class="business-content">
          <div class="content-block">
            <div class="block-unit">
              <h1 class="block-title font-color-success">
                <span class="fa fa-list-ul"></span>
                <span>已完成的项目</span>
              </h1>
              <ul class="block-lists">
                <li class="block-list" v-for="i in 5" :key="i">
                  <div class="list-inner">
                    <div class="list-name">
                      柬埔寨重型机械项目
                    </div>
                    <div class="list-progress">
                      100%
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="block-unit">
              <h1 class="block-title font-color-active">
                <span class="fa fa-road"></span>
                <span>进行中的项目</span>
              </h1>
              <ul class="block-lists">
                <li class="block-list" v-for="i in 5" :key="i">
                  <div class="list-inner">
                    <div class="list-name">
                      柬埔寨重型机械项目
                    </div>
                    <div class="list-progress">
                      90%
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="block-unit">
              <h1 class="block-title font-color-danger">
                <span class="fa fa-warning"></span>
                <span>已逾期的项目</span>
              </h1>
              <ul class="block-lists">
                <li class="block-list" v-for="i in 5" :key="i">
                  <div class="list-inner">
                    <div class="list-name">
                      柬埔寨重型机械项目
                    </div>
                    <div class="list-progress">
                      50%
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </cube-scroll>
      <div class="sticky-header sticky" slot="fixed" ref="stickyHeader">
        <div class="switch-btn">
          <div class="switch-list">
            <div @click="goToPage('workinfos')" class="text">
              <span>审批</span>
              <span v-if="Work !== 0" class="badge">{{ Work }}</span>
            </div>
          </div>
          <div @click="goToPage('messageinfos')" class="switch-list">
            <div class="text">
              <span>消息</span>
              <span v-if="Message !== 0" class="badge">{{ Message }}</span>
            </div>
          </div>
          <div @click="goToPage('notifyInfos')" class="switch-list">
            <div class="text">
              <span>通知</span>
              <span v-if="Notify !== 0" class="badge">{{ Notify }}</span>
            </div>
          </div>
        </div>
        <line-break></line-break>
      </div>
    </cube-sticky>

    <router-view></router-view>

    <loading v-model="mx_isLoading"></loading>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">修改成功</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>

<script type="text/ecmascript-6">
import LineBreak from 'base/line/line.vue'
import { getUserSession, storeUserSession } from 'api/UserSession.js'
import { commonComponentMixin } from 'common/js/mixin.js'
import { MyInformCount } from 'api/index.js'

export default {
  mixins: [commonComponentMixin],
  data () {
    return {
      title: '业务中心',
      UserSession: {},
      businessContent: 0,
      Message: 0,
      Notify: 0,
      Work: 0,
      scrollY: 0,
      checkTop: true,
      scrollEvents: ['scroll'],
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  mounted () {
    this._getUserSession((session) => {
      this._MyInformCount(session.HumanId)
    })
  },
  methods: {
    scrollHandler ({ y }) {
      this.scrollY = -y
    },
    diffChange (diff, height) {
      let opacity = 0
      if (height) {
        opacity = diff / height
      }
      this.$refs.stickyHeader.style.opacity = opacity
    },
    // 获取UserSession
    _getUserSession (callback) {
      this.MinXinHttpFetch(getUserSession(), (response) => {
        this.UserSession = response.data.value
        storeUserSession(response.data.value)

        if (callback) {
          callback(response.data.value)
        }
      })
      this.isLoading = true
    },
    _MyInformCount (HumanId) {
      this.MinXinHttpFetch(MyInformCount(HumanId), (response) => {
        let data = response.data
        this.Message = data.Message
        this.Notify = data.Notify
        this.Work = data.Work
      })
    },
    goToPage (page) {
      this.$router.push(`/weixin/business/${page}`)
    }
  },
  components: {
    LineBreak
  }
}
</script>

<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  .content-box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 56px;
    z-index: 100;
    .business-header, .sticky-header{
      width: 100%;
      .content-logo {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 50%;
        overflow: hidden;
        .content-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .human-message {
          width: 80%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          .avatar {
            width: 60px;
            height: 60px;
            flex: 0 0 60px;
            .header-logo{
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .message{
            flex: 1;
            font-size: 18px;
            padding-left: 20%;
            color: #ffffff;
            text-align: left;
            p {
              line-height: 30px;
            }
          }
        }
      }
      .switch-btn{
        display: flex;
        width: 100%;
        background-color: #ffffff;
        .switch-list {
          flex: 1;
          border-right: 1px solid #dddddd;
          padding: 5px 0;
          .text{
            display: block;
            width: 50%;
            height: 30px;
            text-align: center;
            margin: 0 auto;
            line-height: 30px;
            position: relative;
            font-size: 14px;
            .badge{
              display: inline-block;
              position: absolute;
              min-width: 15px;
              height: 15px;
              line-height: 15px;
              border-radius: 9px;
              top: 0px;
              right: -10px;
              background-color: red;
              color: #ffffff;
              font-size: 10px;
            }
          }
          &:last-child{
            border-right: 1px solid transparent;
          }
        }
      }
    }
    .sticky-header {
      &.sticky {
         opacity: 0;
      }
    }
    .business-content {
      position: relative;
      .content-block {
        width: 100%;
        display: block;
        .block-unit {
          .block-title {
            padding: 10px;
            font-size: 14px;
            .bottom-line();
          }
          .block-lists {
            padding: 10px 0;
            .bottom-line();
            .block-list {
              .list-inner {
                width: 100%;
                display: flex;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.6);
                .list-name {
                  flex: 1;
                  padding: 0 10px;
                  min-width: 10px;
                  line-height: 30px;
                }
                .list-progress {
                  flex: 0 0 50px;
                  min-width: 10px;
                  height: 30px;
                  width: 50px;
                  text-align: center;
                  line-height: 30px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
