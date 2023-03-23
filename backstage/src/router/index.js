import { createRouter, createWebHistory } from 'vue-router';
import { useAdminStore } from '@/stores/admin';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
      children: [
        {
          path: 'productList',
          name: 'productList',
          component: () => import('../views/product/list.vue'),
        },
        {
          path: 'addProduct',
          name: 'addProduct',
          component: () => import('../views/product/add.vue'),
        },
        {
          path: 'productType',
          name: 'productType',
          component: () => import('../views/product/type.vue'),
        },
        {
          path: 'orderList',
          name: 'orderList',
          component: () => import('../views/order/list.vue'),
        },
        // {
        //   path: 'userList',
        //   name: 'userList',
        //   component: () => import('../views/user/list.vue'),
        // },
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
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.fullPath === '/login') {
    // 访问登录页 直接放行
    next();
  } else {
    const adminStore = useAdminStore();
    const token = localStorage.getItem('token');
    // 访问其他页面 判断用户是否登录
    if (adminStore.adminInfo) {
      next();
    } else if (!adminStore.adminInfo && token) {
      const result = await adminStore.whoAmI();
      if (result) {
        next();
      } else {
        next({ name: 'login' });
      }
    } else {
      next({ name: 'login' });
    }
  }
});

export default router;
