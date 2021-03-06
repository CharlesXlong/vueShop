import Vue from 'vue'
import App from './App'
import router from './router'

import  './assets/css/globle.css'

// 加载图标库
import './assets/fonts/iconfont.css'
// 加载组件库
import EI from 'element-ui'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1/'
axios.interceptors.request.use(
  config => {
    var token = window.sessionStorage.getItem('token')
    config.headers.Authorization = token
    return config
  }, err => {
    return Promise.reject(err);
  })

Vue.prototype.$http = axios
Vue.use(EI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
