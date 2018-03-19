import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import BaiduMap from 'vue-baidu-map'
import App from './App'
import Test from './components/Test/Test.vue'

import './common/stylus/index.styl'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { Select, Option, Icon, Slider, Cascader, Input, InputNumber, Button, ButtonGroup } from 'element-ui'
Vue.use(Select)
Vue.use(Option)
Vue.use(Icon)
Vue.use(Slider)
Vue.use(Cascader)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(ButtonGroup)

Vue.use(VueRouter)

Vue.use(VueAxios, axios)

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '4AOGTQyDKKuHOTI3gKRmZfYo2Ifs7iov'
})

const routes = [{
  path: '/',
  component: Test
}, {
  path: '/Test',
  component: Test
}]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

FastClick.attach(document.body)

Vue.config.productionTip = false

// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
}

Vue.prototype.$goBack = function () {
  // this.$router.go(-1)
  this.$router.back()
}

Vue.filter('currency', function (value) {
  if (!value) return ''
  return isNaN(value) ? 0 : parseFloat(value.toFixed(2))
})

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
