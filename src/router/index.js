import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 定义路由规则
let router = new Router({
  mode: 'history',
  routes: [
    ...require('./modules/A'),
    ...require('./modules/B'),
       ...require('./modules/D')
    {
      path: '/none-main',
      name: 'none-main',
      component: resolve => require(['views/none-main'], resolve),
      meta: { view: 'defaultView' }
    }
  ]
})