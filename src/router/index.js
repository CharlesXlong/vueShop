import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import login from '@/components/qqq.vue'

// 登录模块
import login from '../comps/login.vue'
//主页模块
import home from '../comps/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '/', name: 'HelloWorld',component: HelloWorld}
    { path: '/login', component: login },
    { path: '/home', component: home }
  ]
})
