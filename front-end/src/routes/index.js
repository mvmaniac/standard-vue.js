import { createRouter, createWebHistory } from 'vue-router';
import store from '@/stores';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/add',
      component: () => import('@/views/PostAddPage.vue'),
      meta: { auth: true },
    },
    {
      component: () => import('@/views/PostEditPage.vue'),
      path: '/post/:id',
      meta: { auth: true },
    },
    {
      path: '/404',
      name: 'NotFoundPage',
      component: () => import('@/views/NotFoundPage.vue'),
    },
    {
      path: '/:catchAll(.*)', // Unrecognized path automatically matches 404
      redirect: '/404',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    return next('/login');
  }
  return next();
});

export default router;
