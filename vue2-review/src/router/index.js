import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/vuex',
      name: 'vuex',
      component: () => import('../views/VuexView.vue')
    },
    {
      path: '/vuex-named',
      name: 'vuex-named',
      component: () => import('../views/VuexNamedView.vue')
    },
    {
      path: '/rotate',
      name: 'rotate',
      component: () => import('../views/RotateNav.vue')
    },
    {
      path: '/rotateHorse',
      name: 'rotateHorse',
      component: () => import('../views/RotateHorse.vue')
    }
  ]
})

export default router
