const demo3 = () => import('win-form/demo3/demo_win.vue')
const demoForm3 = () => import('win-form/demo3/demo_form.vue')

export function winsForms () {
  return [
    {
      path: '/weixin/form/5ea8ae36-784b-6aad-1a55-6e098a2e813a',
      name: '主合同评审窗体',
      meta: {
        title: '主合同评审窗体'
      },
      component: demo3,
      children: [
        {
          path: '/weixin/form/5ea8ae36-784b-6aad-1a55-6e098a2e813a/:formstate/:Id',
          name: '主合同评审表单',
          meta: {
            title: '主合同评审表单'
          },
          component: demoForm3
        }
      ]
    }
  ]
}
