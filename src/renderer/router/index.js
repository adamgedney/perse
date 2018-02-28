import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/assets',
      name: 'assets',
      component: require('@/components/Assets').default
    },
    {//$route.params.id
      path: '/asset/:id',
      name: 'asset',
      component: require('@/components/Asset').default
    },
    // {
    //   path: '*',
    //   redirect: '/'
    // }
  ]
})
