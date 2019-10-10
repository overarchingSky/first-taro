export default [
    {
      path: '/A/main',
      name: 'A-main',
      component: resolve => require(['views/A/main'], resolve),
      meta: { view: 'defaultView' }
    }
]