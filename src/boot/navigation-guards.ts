import type {
  RouteLocationNormalized,
  RouteRecordNormalized,
} from 'vue-router';

import { defineBoot } from '#q-app/wrappers';
import { storeToRefs } from 'pinia';

import { useAuthStore } from 'stores/auth';

function requiresAuth(to: RouteLocationNormalized) {
  const { isAuthenticated } = storeToRefs(useAuthStore());

  if (
    to.matched.some(
      (record: RouteRecordNormalized) => record.meta.requiresAuth,
    ) &&
    !isAuthenticated.value
  ) {
    alert('로그인이 필요한 페이지입니다.');
    return '/';
  }
  return true;
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(({ router }) => {
  router.beforeEach(requiresAuth);
});
