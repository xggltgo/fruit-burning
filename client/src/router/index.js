import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path:'/',
      name:"home",
      component: () => import('../views/home.vue')
    },
    {
      path:'/all',
      name:"all",
      component: () => import('../views/all.vue')
    },
    {
      path:'/dynamic',
      name:"dynamic",
      component: () => import('../views/dynamic.vue')
    },
    {
      path:'/pay',
      name:"pay",
      component: () => import('../views/pay.vue')
    },
    {
      path:'/about',
      name:"about",
      component: () => import('../views/about.vue')
    },
    {
      path:'/offline',
      name:"offline",
      component: () => import('../views/offline.vue')
    }
  ]
})

export default router
