import type { RouterConfig } from '@nuxt/schema'

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/index.vue')
    },
    {
      name: 'map-overview',
      path: '/woningen',
      component: () => import('~/pages/map-overview.vue')
    }
  ],
} satisfies RouterConfig
