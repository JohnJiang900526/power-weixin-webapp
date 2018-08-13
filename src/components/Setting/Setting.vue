<template>
  <div class="setting">
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
        <cube-sticky-ele>
          <div class="sticky-header">
            <div class="header">
              <div class="avatar-wrap">
                <img class="avatar" src="./default-sir.jpg" alt="头像">
              </div>
              <div class="header-text-wrap">
                <span class="header-text">{{ UserInfo.Name || '' }}</span>
              </div>
            </div>
          </div>
        </cube-sticky-ele>
        <line-break></line-break>
        <div class="message-list">
          <ul class="lists">
            <li class="item-list">
              <div class="item-inner">
                <div class="title-text">
                  登录名
                </div>
                <div class="title-value">
                  {{ UserInfo.Code || '' }}
                </div>
              </div>
            </li>
            <li class="item-list">
              <div class="item-inner">
                <div class="title-text">
                  微信账号
                </div>
                <div class="title-value">
                  {{ UserInfo.WeChat || ""}}
                </div>
              </div>
            </li>
            <li class="item-list">
              <div class="item-inner">
                <div class="title-text">
                  当前项目
                </div>
                <div class="title-value">{{ UserInfo.EpsProjName || "" }}</div>
              </div>
            </li>
            <li class="item-list">
              <div class="item-inner">
                <div class="title-text">
                  职位名称
                </div>
                <div @click="showUpDateBlock('PosiName')" class="title-value can-edit">
                  {{ UserInfo.PosiName || "" }}
                </div>
              </div>
            </li>
            <li class="item-list">
              <div class="item-inner">
                <div class="title-text">
                  Email账号
                </div>
                <div @click="showUpDateBlock('Email')" class="title-value can-edit">
                  {{ UserInfo.Email || ""}}
                </div>
              </div>
            </li>
            <li class="item-list">
              <div class="item-inner">
                <div class="title-text">
                  QQ账号
                </div>
                <div @click="showUpDateBlock('QQ')" class="title-value can-edit">
                  {{ UserInfo.QQ || ""}}
                </div>
              </div>
            </li>
            <li class="item-list">
              <div class="item-inner">
                <div class="title-text">
                  手机
                </div>
                <div @click="showUpDateBlock('Mobile')" class="title-value can-edit">
                  {{ UserInfo.Mobile || ""}}
                </div>
              </div>
            </li>
            <li class="item-list">
              <div class="item-inner">
                <div class="title-text">
                  出生年月
                </div>
                <div @click="showUpDateBlock('Birthday')" class="title-value can-edit">
                  {{ _formatDate(UserInfo.Birthday) || ""}}
                </div>
              </div>
            </li>
            <li class="item-list">
              <div class="item-inner">
                <div class="title-text">
                  毕业院校
                </div>
                <div @click="showUpDateBlock('Schoole')" class="title-value can-edit">
                  {{ UserInfo.Schoole || ""}}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <line-break></line-break>
        <div class="user-action">
          <div class="change-password-warp">
            <div class="change-text">
              修改密码
            </div>
            <div @click="reset" class="change-icon can-edit">
              <span class="fa fa-pencil"></span>
            </div>
          </div>
          <line-break></line-break>
        </div>
        <div class="sign-out-wrap">
          <div @click="signOut" class="sign-out">
            退出登录
          </div>
        </div>
      </cube-scroll>
      <div class="sticky-header sticky" slot="fixed" ref="stickyHeader">
        <div class="header">
          <div class="avatar-wrap">
            <img class="avatar" src="./default-sir.jpg" alt="头像">
          </div>
          <div class="header-text-wrap">
            <span class="header-text">{{ UserInfo.Name || '' }}</span>
          </div>
        </div>
      </div>
    </cube-sticky>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <update-human-info @upDateUserInfo="UpdHumanInfo" :field="field" :UserInfo="UserInfo" ref="UpdateHumanInfo"></update-human-info>
    <loading v-model="mx_isLoading"></loading>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">修改成功</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>

<script type="text/ecmascript-6">
import LineBreak from 'base/line/line.vue'
import UpdateHumanInfo from 'base/update-human-info/update-human-info.vue'

import { clearStorage, formatDate } from 'common/js/Util.js'
import { commonComponentMixin } from 'common/js/mixin.js'
import { LoginOut, getUserInfo } from 'api/index.js'

export default {
  mixins: [commonComponentMixin],
  data () {
    return {
      title: '我的',
      resetPassword: false,
      UserInfo: {},
      field: '',
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
    this._getUserInfo()
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
    UpdHumanInfo (isSame) {
      if (isSame) {
        this._getUserInfo()
      }
    },
    showUpDateBlock (field) {
      this.field = field
      this.$refs.UpdateHumanInfo.show()
    },
    reset () {
      this.$router.push('/weixin/setting/reset')
    },
    signOut () {
      this.MinXinHttpFetch(LoginOut(), (response) => {
        clearStorage()
        this.$router.push('/weixin/login')
      })
    },
    _getUserInfo () {
      this.MinXinHttpFetch(getUserInfo(), (response) => {
        this.UserInfo = response.data
      })
    },
    _formatDate (data) {
      return formatDate(data)
    }
  },
  components: {
    LineBreak,
    UpdateHumanInfo
  }
}
</script>

<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .setting {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 56px;
    z-index: 100;
    width: 100%;
    overflow-y: auto;
    .sticky-header{
      .header {
        padding: 10px;
        display: flex;
        background-color: #ffffff;
        .avatar-wrap {
          flex: 0 0 45px;
          width: 45px;
          height: 45px;
          .avatar {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
        .header-text-wrap{
          flex: 1;
          padding: 0 5px;
          line-height: 45px;
          text-align: right;
          .header-text{
            .baseFontColor()
          }
        }
      }
      &.sticky {
        opacity: 0;
        .header {
          .bottom-line();
        }
      }
    }
    .message-list {
      padding:  0 10px;
      .lists {
        .item-list{
          border-bottom: 1px solid #dddddd;
          .item-inner{
            display: flex;
            padding: 15px 0;
            .title-text{
              flex: 0 0 100px;
              .baseFontColor();
              font-size: 14px;
            }
            .title-value{
              flex: 1;
              text-align: right;
              color: rgba(0, 0, 0, 0.7);
              font-size: 14px;
              &.can-edit {
                color: #007ACC;
              }
            }
          }
          &:last-child{
            border-bottom: 1px solid transparent;
          }
        }
      }
    }
    .user-action{
      width: 100%;
      .change-password-warp{
        display: flex;
        padding: 0 10px;
        .change-text{
          flex: 0 0 100px;
          .baseFontColor();
          font-size: 14px;
          line-height: 40px;
        }
        .change-icon{
          flex: 1;
          text-align: right;
          color: rgba(0, 0, 0, 0.7);
          font-size: 14px;
          line-height: 40px;
          &.can-edit {
            color: #007ACC;
          }
        }
      }
    }
    .sign-out-wrap {
      width: 100%;
      .sign-out{
        margin: 50px 10px 50px 10px;
        padding: 10px 10px;
        border-radius: 5px;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        background-color: #f6383a;
      }
    }
  }
</style>
