import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue'
import NotFound from '@/views/not-found.vue';

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
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
    },
    {
      path: '/all',
      name: 'all',
      component: () => import('../views/all/index.vue'),
    },
    // {
    //   path: '/dynamic',
    //   name: 'dynamic',
    //   component: () => import('../views/dynamic.vue'),
    // },
    // {
    //   path: '/pay',
    //   name: 'pay',
    //   component: () => import('../views/pay.vue'),
    // },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about.vue'),
    },
    // {
    //   path: '/offline',
    //   name: 'offline',
    //   component: () => import('../views/offline.vue'),
    // },
    {
      path: '/person',
      name: 'person',
      component: () => import('../views/person/index.vue'),
      children: [
        {
          path: 'info',
          name: 'info',
          component: () => import('../views/person/info.vue'),
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/person/order/index.vue'),
        },
        {
          path: 'receive',
          name: 'receive',
          component: () => import('../views/person/receive/index.vue'),
        },
      ],
    },
    {
      path: '/product/detail/:id',
      name: 'productDetail',
      component: () => import('../views/product-detail/index.vue'),
    },
    {
      path: '/order/detail/:id',
      name: 'orderDetail',
      component: () => import('../views/order-detail/index.vue'),
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/result/index.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/search/index.vue'),
    },
    {
      path: '/404',
      name: 'notFound',
      component: () => import('../views/not-found.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404',
    },
  ],
});

export default router;
