<template>
  <div class="login-box">
    <div class="login-logo">
      <img class="logo-bg" src="./login-banner.jpg">
      <img class="logo" src="./logo.png">
    </div>
    <div class="inputs-warp">
      <div class="row-input">
        <div class="icon">
          <span class="fa fa-user"></span>
        </div>
        <div class="input-box">
          <div class="input-inner">
            <input v-model="Name" type="text" contenteditable="true" placeholder="用户名">
          </div>
        </div>
      </div>
      <div class="row-input">
        <div class="icon">
          <span class="fa fa-lock"></span>
        </div>
        <div class="input-box">
          <div class="input-inner">
            <input v-model="PassWord" type="password" contenteditable="true" placeholder="输入密码">
          </div>
        </div>
      </div>
    </div>
    <div class="login-btn-wrap">
      <div @click="login" @keyup.enter="login" class="login-btn">登录</div>
    </div>

    <loading v-model="mx_isLoading"></loading>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">修改成功</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>
<script type="text/ecmascript-6">
import { Login, getTokenString } from 'api/login.js'
import { getUserSession, storeUserSession } from 'api/UserSession.js'
import { commonComponentMixin } from 'common/js/mixin.js'

const debug = process.env.NODE_ENV !== 'production'

export default {
  mixins: [commonComponentMixin],
  data () {
    return {
      Name: 'demo',
      PassWord: '',
      weConfig: {},
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  created () {
    this.keydownEvent()
  },
  mounted () {
    let Token = getTokenString()

    if (Token) {
      this.$router.push('/business')
    }
  },
  methods: {
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
    // 解绑
    unbindKeyDown () {
      document.removeEventListener('keydown', this.bindKeyDown)
    },
    // 绑定事件
    bindKeyDown (e) {
      var keyCode = e.keyCode
      if (keyCode === 13) {
        if (!this.Name) {
          return false
        }
        this.login()
      }
    },
    // 点击enter 执行提交
    keydownEvent () {
      document.addEventListener('keydown', this.bindKeyDown)
    },
    // 登录事件
    login () {
      this.MinXinHttpFetch(Login(this.Name, this.PassWord), (response) => {
        if (response.success) {
          this._getUserSession((res) => {
            let { HumanId } = res

            if (debug) {
              this.$router.push('/business')
            } else {
              window.open('/weixin3.0/Reg.ashx?hum=' + HumanId, '_self')
            }
          })
        }
      })
    },
    alertHide () {
      this.alertShow = false
    }
  },
  destroyed () {
    this.unbindKeyDown()
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .login-box{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    .baseBgColor();
    .login-logo {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 50%;
        overflow: hidden;
      .logo-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .logo {
        width: 60%;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .inputs-warp{
      margin-top: 10px;
      padding: 20px 10px;
      .row-input{
        padding: 5px;
        margin: 20px 0;
        border-bottom: 1px solid #ddd;
        display: flex;
        .icon{
          position: relative;
          width: 30px;
          height: 30px;
          flex: 0 0 30px;
          font-size: 20px;
          .active-status();
          .fa{
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
          }
        }
        .input-box{
          flex:1;
          .input-inner{
            input{
              display: block;
              width: calc(100% - 20px);
              padding: 5px 10px;
              font-size: 14px;
              background-color: transparent;
            }
          }
        }
      }
    }
    .login-btn-wrap {
      width: 100%;
      .login-btn{
        width: 85%;
        margin: 0 auto;
        color: #fff;
        text-align: center;
        padding: 10px;
        border-radius: 5px;
        background-color: #007ACC;
      }
    }
  }
</style>
