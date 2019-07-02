import { systemConfig } from 'common/js/config.js'
import { getUserSession, storeUserSession } from 'api/UserSession'
import { Loading, Alert, Toast, XTextarea, Group } from 'vux'
import { DatePicker } from 'cube-ui'
import { formatDate, checkLoginTime, clearStorage } from 'common/js/Util.js'
import { getTokenMsg } from 'api/login.js'
import { mapMutations } from 'vuex'

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
      let token = getTokenMsg()

      if (token) {
        let keepLogin = checkLoginTime(token)

        if (!keepLogin) {
          clearStorage()
          this.$router.push('/login')
          this.setTokenFailure(true)
        } else {
          this.setTokenFailure(false)
        }
      } else {
        this.setTokenFailure(false)
        this.$router.push('/login')
      }

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
        if (err.message === 501) {
          clearStorage()
          this.$router.push('/login')
          this.setTokenFailure(true)
          return false
        }
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
        if (response.success) {
          storeUserSession(response.data.value)
          if (callback) {
            callback(response)
          }
        }
      })
    },
    beforeDestroy () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    ...mapMutations({
      setTokenFailure: 'TOKENFAILURE'
    })
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
    return {
      actionMenu: []
    }
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
    DatePicker
  }
}

// 全局mixin
export const globalMixin = {
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      let currentRoute = this.$route

      if (currentRoute.name !== 'Login') {
        let checkValue = this.checkFunc()
        if (checkValue) {
          return false
        } else {
          clearStorage()
          this.setTokenFailure(true)
          this.$router.push("/login")
        }
      }
    },
    checkFunc () {
      let yes = true
      let no = false
      let tokenMsg = getTokenMsg()
      let nowTime = (new Date()).getTime()

      if (tokenMsg) {
        let validTime = Math.ceil(nowTime / 1000)
        let restTime = (tokenMsg.exp - 3600) - validTime

        return restTime > 0 ? yes : no
      } else {
        return no
      }
    },
    ...mapMutations({
      setTokenFailure: 'TOKENFAILURE'
    })
  }
}
