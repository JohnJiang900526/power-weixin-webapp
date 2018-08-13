<template>
  <div class="update-human-info" ref="UpdateHumanInfo" :style="{'transform': 'translate3d(' + this.offset + '%, 0, 0)'}">
    <div class="header">
      <span @click="back" class="fa fa-angle-left"></span>
      <h1 class="title-name">修改信息</h1>
    </div>
    <div class="inputs-warp">
      <div v-if="field === 'PosiName'" class="row-input">
        <div class="icon">
          <span class="fa fa-user-circle"></span>
        </div>
        <div class="input-box">
          <div class="input-inner">
            <input v-model="UserInfo.PosiName" type="text" placeholder="输入职位名称">
          </div>
        </div>
      </div>
      <div v-if="field === 'Email'" class="row-input">
        <div class="icon">
          <span class="fa fa-envelope-o"></span>
        </div>
        <div class="input-box">
          <div class="input-inner">
            <input v-model="UserInfo.Email"  type="text" placeholder="输入邮箱">
          </div>
        </div>
      </div>
      <div v-if="field === 'QQ'" class="row-input">
        <div class="icon">
          <span class="fa fa-qq"></span>
        </div>
        <div class="input-box">
          <div class="input-inner">
            <input v-model="UserInfo.QQ" type="number" placeholder="输入QQ账号">
          </div>
        </div>
      </div>
      <div v-if="field === 'Mobile'" class="row-input">
        <div class="icon">
          <span class="fa fa-mobile-phone"></span>
        </div>
        <div class="input-box">
          <div class="input-inner">
            <input v-model="UserInfo.Mobile" type="number" placeholder="输入手机号">
          </div>
        </div>
      </div>
      <div v-if="field === 'Birthday'" class="row-input">
        <div class="icon">
          <span class="fa fa-clock-o"></span>
        </div>
        <div class="input-box">
          <div @click="showDataPicker" class="input-inner">
            <input v-model="UserInfo.Birthday" type="text" placeholder="输入出生日期">
          </div>
        </div>
      </div>
      <div v-if="field === 'Schoole'" class="row-input">
        <div class="icon">
          <span class="fa fa-fort-awesome"></span>
        </div>
        <div class="input-box">
          <div class="input-inner">
            <input  v-model="UserInfo.Schoole" type="text" placeholder="输入毕业院校">
          </div>
        </div>
      </div>
    </div>
    <div class="update-human-btn-wrap">
      <div @click="upDateHuman" class="update-human-btn">
        确定修改
      </div>
    </div>
    <date-picker class="data-picker" ref="updateDataPicker"
      :min="min"
      :max="max"
      :value="value"
      :title="title"
      :format="dateShowFormat"
      @select="selectDate"
    >
    </date-picker>
    <loading v-model="mx_isLoading"></loading>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">修改成功</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>
<script type="text/ecmascript-6">
import { UpdHumanInfo } from 'api/index.js'
import { getStoreUserSession } from 'api/UserSession.js'
import { commonComponentMixin } from 'common/js/mixin.js'
import { isObjectValueEqual, formatDate } from 'common/js/Util.js'
import { DatePicker } from 'cube-ui'

export default {
  mixins: [commonComponentMixin],
  props: {
    field: {
      type: String,
      default: ''
    },
    UserInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      offset: 100,
      UserInfoString: '',
      title: '日期',
      min: new Date(1900, 1, 1),
      max: new Date(2100, 12, 30),
      value: new Date(),
      dateShowFormat: {year: 'YYYY', month: 'MM', date: 'DD'},
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  methods: {
    selectDate (selectDate) {
      this.UserInfo.Birthday = formatDate(selectDate)
    },
    showDataPicker () {
      this.$refs.updateDataPicker.show()
    },
    upDateHuman () {
      let UserSession = getStoreUserSession()

      this.MinXinHttpFetch(UpdHumanInfo(this.UserInfo), (response) => {
        this.mx_toastShow = true
        this.$emit('upDateUserInfo', true)
      }, UserSession.IsAdmin)
    },
    back () {
      let isSame = isObjectValueEqual(this.UserInfoDefault, this.UserInfo)
      this.offset = 100
      this.$emit('upDateUserInfo', isSame)
    },
    show () {
      this.offset = 0
      this.saveDefaultData()
    },
    saveDefaultData () {
      this.UserInfoDefault = Object.assign({}, this.UserInfo)
    }
  },
  components: {
    DatePicker
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .update-human-info {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    transition: all 0.3s;
    background-color: #ffffff;
    .header{
      position: relative;
      width: 100%;
      height: 44px;
      .bottom-line();
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
    .update-human-btn-wrap {
      width: 100%;
      .update-human-btn {
        margin: 30px 10px 10px 10px;
        padding: 10px 10px;
        border-radius: 5px;
        text-align: center;
        color: #ffffff;
        font-size: 14px;
        background-color: #007ACC;
      }
    }
    .data-picker {
      .cube-picker-choose {
        &.border-bottom-1px {
          border-bottom: 1px solid #dddddd;
        }
      }
      .cube-picker-content {
        .border-bottom-1px {
          border-bottom: 1px solid #dddddd;
        }
        .border-top-1px {
          border-top: 1px solid #dddddd;
        }
      }
    }
  }
</style>
