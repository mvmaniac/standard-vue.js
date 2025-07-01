import type { Router, RouteRecordInfo } from 'vue-router';

import { defineRouter } from '#q-app/wrappers';
import { LoadingBar } from 'quasar';
// eslint-disable-next-line import/no-unresolved
import { setupLayouts } from 'virtual:generated-layouts';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { routes } from 'vue-router/auto-routes';

declare module 'vue' {
  interface ComponentCustomProperties {
    $router: Router;
    $route: RouteRecordInfo;
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
export default defineRouter(function (/* { store, ssrContext } */) {
  for (const route of routes) {
    if (!route.path.startsWith('/admin')) {
      continue;
    }

    route.meta = {
      ...route.meta,
      layout: 'admin',
    };
  }

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: setupLayouts(routes),

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  router.beforeEach(() => {
    LoadingBar.start();
  });

  router.afterEach(() => {
    LoadingBar.stop();
  });

  return router;
});
