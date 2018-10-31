const window = () => import('win-form/window.vue')
const form = () => import('win-form/form.vue')

const Active = () => import('components/WorkFlow/Active.vue')
const Agree = () => import('components/WorkFlow/Agree.vue')
const Monitor = () => import('components/WorkFlow/Monitor.vue')
const Return = () => import('components/WorkFlow/Return.vue')
const Delegate = () => import('components/WorkFlow/Delegate.vue')
const Delegateing = () => import('components/WorkFlow/Delegateing.vue')
const Stop = () => import('components/WorkFlow/Stop.vue')
const Historys = () => import('components/WorkFlow/History.vue')
const showMessage = () => import('components/sub-module/show-message/show-message.vue')

export function winsForms () {
  return [
    {
      path: '/weixinform/:menuId',
      meta: {
        title: '窗体'
      },
      component: window
    },
    {
      path: '/weixinform/:FromId/:formstate/:Id',
      meta: {
        title: '表单'
      },
      name: 'form',
      component: form
    },
    {
      path: '/forkflow/active',
      meta: {
        title: '送审'
      },
      component: Active
    },
    {
      path: '/forkflow/agree',
      meta: {
        title: '同意'
      },
      component: Agree
    },
    {
      path: '/forkflow/monitor',
      meta: {
        title: '流程监控'
      },
      component: Monitor
    },
    {
      path: '/forkflow/return',
      meta: {
        title: '流程驳回'
      },
      component: Return
    },
    {
      path: '/forkflow/delegate',
      meta: {
        title: '流程委派'
      },
      component: Delegate
    },
    {
      path: '/forkflow/delegateing',
      meta: {
        title: '流程委派处理'
      },
      component: Delegateing
    },
    {
      path: '/forkflow/stop',
      meta: {
        title: '流程终止'
      },
      component: Stop
    },
    {
      path: '/forkflow/history',
      meta: {
        title: '流程历史'
      },
      component: Historys
    },
    {
      path: '/showMessage/:Id',
      meta: {
        title: '消息详情'
      },
      component: showMessage
    }
  ]
}
