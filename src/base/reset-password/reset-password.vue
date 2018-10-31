<template>
  <transition name="slide">
    <div class="reset-password">
      <div class="header" v-show="false">
        <span @click="back" class="fa fa-angle-left"></span>
        <h1 class="title-name">修改密码</h1>
      </div>
      <line-break v-show="false"></line-break>
      <div class="inputs-warp">
        <div class="row-input">
          <div class="icon">
            <span class="fa fa-lock"></span>
          </div>
          <div class="input-box">
            <div class="input-inner">
              <input v-model="OldPass" type="password" contenteditable="true" placeholder="输入原密码">
            </div>
          </div>
        </div>
        <div class="row-input">
          <div class="icon">
            <span class="fa fa-lock"></span>
          </div>
          <div class="input-box">
            <div class="input-inner">
              <input v-model="NewPass" type="password" contenteditable="true" :placeholder="placeholder">
            </div>
          </div>
        </div>
        <div class="row-input">
          <div class="icon">
            <span class="fa fa-lock"></span>
          </div>
          <div class="input-box">
            <div class="input-inner">
              <input v-model="reNewPass" type="password" contenteditable="true" placeholder="重复新密码">
            </div>
          </div>
        </div>
      </div>
      <div class="change-password-wrap">
        <div @click="changePass" class="change-password">
          确定修改
        </div>
      </div>
      <loading v-model="isLoading"></loading>
      <alert v-model="alertShow" @on-hide="alertHideEvent" :title="alertTitle" :content="message"></alert>
      <toast v-model="toastShow" type="text" :time="deleyTime">修改成功</toast>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import LineBreak from 'base/line/line.vue'
import { Loading, Alert, Toast } from 'vux'
import { ChangePass, PassRole } from 'api/index.js'

const NotEqual = '新密码和重复新密码不一致'

export default {
  data () {
    return {
      title: '修改密码',
      isLoading: false,
      alertShow: false,
      message: '',
      alertTitle: '提示',
      OldPass: '',
      NewPass: '',
      reNewPass: '',
      toastShow: false,
      deleyTime: 1000,
      PassRoleObj: {},
      placeholder: '新密码强度'
    }
  },
  mounted () {
    this.PassRole(() => {
      this.placeholder = this.checkPlaceholder()
    })
  },
  methods: {
    checkPlaceholder () {
      let hasEnglish =
        this.PassRoleObj.hasEnglish ? '包含英文字母' : ''
      let hasNumber =
        this.PassRoleObj.hasNumber ? ' 包含数字' : ''
      let hasSymbol =
        this.PassRoleObj.hasSymbol ? ' 包含字符' : ''
      let minLength =
        this.PassRoleObj.minLength ? ' 密码长度不少于' + this.PassRoleObj.minLength + '位' : ''

      // let hasValidation = this.PassRoleObj.hasValidation

      return `新密码强度:${hasEnglish}${hasNumber} ${hasSymbol}${minLength}`
    },
    PassRole (callback) {
      PassRole().then((response) => {
        this.PassRoleObj = response.data
        if (callback) {
          callback()
        }
      })
    },
    // 修改密码
    changePass () {
      if (this.NewPass === this.reNewPass) {
        this._changePass()
      } else {
        this.message = NotEqual
        this.alertShow = true
      }
    },
    // 关闭alert的时候执行
    alertHideEvent () {
      this.message = ''
      this.alertShow = false
    },
    // 显示alert的时候执行
    alertShowEvent (message) {
      this.message = message
      this.alertShow = true
    },
    back () {
      this.$router.back()
    },
    _changePass () {
      this.isLoading = true
      ChangePass(this.OldPass, this.NewPass).then((response) => {
        this.isLoading = false
        console.log(response)
        if (!response.success) {
          this.alertShowEvent(response.message)
        } else {
          this.toastShow = true
          this._deleyClear()
        }
      }).catch((e) => {
        this.isLoading = false
        this.alertShowEvent(e.message)
      })
    },
    _deleyClear () {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.OldPass = ''
        this.NewPass = ''
        this.reNewPass = ''
      }, this.deleyTime)
    }
  },
  components: {
    LineBreak,
    Alert,
    Loading,
    Toast
  }
}
</script>

<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .reset-password{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    background-color: #F7F7F7;
    &.slide-enter-active, &.slide-leave-active{
      transition: all 0.3s
    }
    &.slide-enter, &.slide-leave-to{
      transform: translate3d(100%, 0, 0)
    }
    .header{
      position: relative;
      width: 100%;
      height: 44px;
      .fa{
        position: absolute;
        top: 50%;
        left: 0px;
        padding: 0 15px;
        font-size: 25px;
        transform: translateY(-50%);
      }
      .title-name{
        width: 60%;
        line-height: 44px;
        margin: 0 auto;
        text-align: center;
      }
    }
    .inputs-warp{
      padding: 10px;
      .row-input{
        padding: 5px;
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
    .change-password-wrap {
      width: 100%;
      .change-password{
        margin: 30px 10px 10px 10px;
        padding: 10px 10px;
        border-radius: 5px;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        background-color: #007ACC;
      }
    }
  }
</style>
