import { systemConfig } from 'common/js/config.js'
import { getUserSession, storeUserSession } from 'api/UserSession'
import { Loading, Alert, Toast, XTextarea, Group, Actionsheet } from 'vux'
import { DatePicker } from 'cube-ui'
import { formatDate } from 'common/js/Util.js'

import {
  NavList,
  SwitchesBox,
  PowerSelect,
  FileAttach,
  Report,
  Comment,
  SearchBox,
  FormList,
  FooterBar
} from 'components/index.js'

export function getHeaderAvatar (HumanHeadId) {
  if (HumanHeadId) {
    return systemConfig.devDomainName + systemConfig.imgBaseUrl + HumanHeadId
  } else {
    return './default-sir.jpg'
  }
}

// 加载数据时运行的组件
export const commonComponentMixin = {
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
  methods: {
    // 通用http请求方法
    MinXinHttpFetch (httpPromise, callback, isAdmin) {
      this.mx_isLoading = true
      httpPromise.then((response) => {
        this.mx_isLoading = false
        if (response.success) {
          callback(response)
          this.MixinAlertHideEvent()
        } else {
          callback(response)
          if (!isAdmin) {
            this.MixinAlertShowEvent(response.message)
          }
        }
      }).catch((err) => {
        this.mx_isLoading = false
        this.MixinAlertShowEvent(err.message)
      })
    },
    // 通用alert显示方法
    MixinAlertShowEvent (message) {
      this.mx_message = message
      this.mx_alertShow = true
    },
    // 通用alert隐藏方法
    MixinAlertHideEvent () {
      this.mx_message = ''
      this.mx_alertShow = false
    },
    _getAvatar () {
      if (this.UserSession && this.UserSession.HumanHeadSmall) {
        this.UserSession.avatar = getHeaderAvatar(this.UserSession.HumanHeadSmall)
      } else {
        return false
      }
    },
    _UserSession (callback) {
      this.MinXinHttpFetch(getUserSession(), (response) => {
        storeUserSession(response.data.value)
        if (callback) {
          callback(response)
        }
      })
    }
  },
  components: {
    Loading,
    Alert,
    Toast
  }
}

// form表单的公共组件和方法
export const formComponentMixin = {
  data () {
    return {}
  },
  methods: {
    // 日期格式化
    _formatDate (date) {
      return formatDate(date)
    }
  },
  components: {
    NavList,
    SwitchesBox,
    PowerSelect,
    FileAttach,
    Report,
    Comment,
    SearchBox,
    FormList,
    FooterBar,
    XTextarea,
    Group,
    DatePicker,
    Actionsheet
  }
}
