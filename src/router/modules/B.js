export default [
    {
      path: '/B/main',
      name: 'B-main',
      component: resolve => require(['views/B/main'], resolve),
      meta: { view: 'defaultView' }
    },
    {
      path: '/B/list',
      name: 'B-list',
      component: resolve => require(['views/B/list'], resolve),
      meta: { view: 'defaultView' }
    }
]