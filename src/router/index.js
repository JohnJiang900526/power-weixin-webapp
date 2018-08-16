import Vue from 'vue'
import Router from 'vue-router'

import Login from 'components/Login/Login'
import project from 'components/Project/Project'
import Setting from 'components/Setting/Setting'
import Business from 'components/Business/Business'
import ResetPassword from 'base/reset-password/reset-password.vue'
import WorkInfos from 'components/sub-module/workInfos/workInfos.vue'
import MessageInfos from 'components/sub-module/messageInfos/messageInfos.vue'
import NotifyInfos from 'components/sub-module/notifyInfos/notifyInfos.vue'
import ChangeProject from 'components/sub-module/change-project/change-project.vue'
import { redirectRoutes } from 'common/js/Util.js'
import { winsForms } from 'common/js/winFormLoad.js'

Vue.use(Router)

let routes = []

// 基础路由
let routesMap = [
  {
    path: '/weixin/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: Login
  },
  {
    path: '/weixin/project',
    name: 'Business',
    meta: {
      title: '项目中心'
    },
    component: project,
    children: [
      {
        path: '/weixin/project/changeproject',
        name: 'changeProject',
        meta: {
          title: '选择项目'
        },
        component: ChangeProject
      }
    ]
  },
  {
    path: '/weixin/business',
    name: 'project',
    meta: {
      title: '业务中心'
    },
    component: Business,
    children: [
      {
        path: 'workinfos',
        name: 'ExamineApprove',
        meta: {
          title: '审批待办'
        },
        component: WorkInfos
      },
      {
        path: 'messageinfos',
        name: 'message',
        meta: {
          title: '消息'
        },
        component: MessageInfos
      },
      {
        path: 'notifyInfos',
        name: 'notify',
        meta: {
          title: '通知'
        },
        component: NotifyInfos
      }
    ]
  },
  {
    path: '/weixin/setting',
    name: 'Setting',
    meta: {
      title: '我的'
    },
    component: Setting,
    children: [
      {
        path: 'reset',
        name: 'ResetPassword',
        meta: {
          title: '重置密码'
        },
        component: ResetPassword
      }
    ]
  }
]

// 窗体和表单的路由
let forms = winsForms()
routesMap = routesMap.concat(forms)

routes = redirectRoutes(routesMap)

export default new Router({
  mode: 'history',
  routes
})
