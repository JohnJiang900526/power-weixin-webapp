// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'common/styles/index.less'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { WechatPlugin } from 'vux'
import Cube from 'cube-ui'
import VueLazyload from 'vue-lazyload'
import fastClick from 'fastclick'
import { routerBeforeEach } from './common/js/Util.js'
import 'font-awesome/css/font-awesome.css'

Vue.use(WechatPlugin)
Vue.use(Cube)
Vue.use(VueLazyload, {
  loading: require('common/img/default.png')
})

fastClick.attach(document.body)
Vue.config.productionTip = false

// 导航守卫
routerBeforeEach(router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
