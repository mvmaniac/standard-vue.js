import { storeToRefs } from 'pinia';
import { readonly, ref, watch } from 'vue';

import { addLike, hasLike, removeLike } from 'src/services';
import { useAuthStore } from 'stores/auth';

export interface UseLikeOptions {
  initialCount: number;
}

export const useLike = (id: string, options?: UseLikeOptions) => {
  const { initialCount = 0 } = options || {};
  const { uid, isAuthenticated } = storeToRefs(useAuthStore());

  const isLike = ref(false);
  const likeCount = ref(initialCount);
  const postId = ref(id);

  const initLike = async () => {
    if (isAuthenticated.value === false) {
      isLike.value = false;
      return;
    }

    isLike.value = await hasLike(uid.value, postId.value);
  };

  const toggleLike = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }

    if (isLike.value) {
      await removeLike(uid.value, postId.value);
      likeCount.value--;
    } else {
      await addLike(uid.value, postId.value);
      likeCount.value++;
    }

    isLike.value = !isLike.value;
  };

  watch(isAuthenticated, () => initLike(), { immediate: true });

  return {
    isLike,
    likeCount: readonly(likeCount),
    updateLikeCount: (count: number) => (likeCount.value = count),
    toggleLike,
  };
};
