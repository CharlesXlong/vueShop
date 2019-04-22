import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import login from '@/components/qqq.vue'

// 登录模块
import login from '../comps/login.vue'
//主页模块
import home from '../comps/home.vue'

import welcome from '../comps/welcome.vue'

import users from '../comps/users.vue'

import roles from '../comps/roles.vue'
import rights from '../comps/rights.vue'
import goods from '../comps/goods.vue'
import params from '../comps/params.vue'
import categories from '../comps/categories.vue'
import orders from '../comps/orders.vue'
import reports from '../comps/reports.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    // {path: '/', name: 'HelloWorld',component: HelloWorld}
    { path: '/', redirect: '/home' },
    { path: '/login', component: login },
    { path: '/home', component: home,redirect:"/welcome" ,
    children:[
      {path:'/welcome',component:welcome},
      {path:'/users',component:users},
      {path:'/roles',component:roles},
      {path:'/rights',component:rights},
      {path:'/goods',component:goods},
      {path:'/params',component:params},
      {path:'/categories',component:categories},
      {path:'/orders',component:orders},
      {path:'/reports',component:reports},
    ]}
  ]
})

router.beforeEach((to, from, next) => {
  var token = window.sessionStorage.getItem('token')
  if (token === null && to.path !== '/login') {
    return next('/login')
  }
  next()
})

export default router
