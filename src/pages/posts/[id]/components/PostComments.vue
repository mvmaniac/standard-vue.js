<script setup lang="ts">
  import type { Comment } from 'src/types';

  import { useAsyncState } from '@vueuse/core';
  import { QInput } from 'quasar';
  import { ref, watch, nextTick } from 'vue';
  import { useRoute } from 'vue-router';

  import CommentList from 'src/components/apps/comment/CommentList.vue';
  import BaseCard from 'src/components/base/BaseCard.vue';
  import { addComment, getComments } from 'src/services';
  import { validateRequired } from 'src/utils/validate-rules';
  import { useAuthStore } from 'stores/auth';

  const message = ref('');

  const isActive = ref(false);
  const toggleActive = () => {
    if (!isActive.value && !authStore.isAuthenticated) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    isActive.value = !isActive.value;
  };

  const qInputRef = ref<InstanceType<typeof QInput> | null>(null);

  // TODO:[yhs] route.params.id 타입 처리?
  const route = useRoute();
  const routeId = (route.params as { id: string }).id;

  const authStore = useAuthStore();

  const { state: comments, execute: executeGetComments } = useAsyncState(
    () => getComments(routeId),
    [],
    {
      resetOnExecute: false, // 기본값은 true인데 그러면 상태유지가 안되고 빈배열로 변환되고 데이터가 다시 셋팅 됨
    },
  );

  const { isLoading, execute: executeAddComment } = useAsyncState(
    addComment,
    null,
    {
      immediate: false,
      throwError: true,
      onSuccess: () => {
        message.value = '';
        isActive.value = false;
        executeGetComments(0);
      },
    },
  );

  const handleAddComment = async () => {
    await executeAddComment(0, routeId, {
      message: message.value,
      uid: authStore.uid,
    } as Comment);
  };

  const deletedComment = () => executeGetComments(0);

  watch(isActive, async (newValue) => {
    if (!newValue) return;

    await nextTick(() => {
      if (qInputRef.value) {
        qInputRef.value.focus();
      }
    });
  });
</script>

<template>
  <div>
    <div class="text-subtitle1 text-weight-bold q-mb-lg">
      댓글 {{ comments.length }}
    </div>

    <div v-if="isActive">
      <q-form @submit.prevent="handleAddComment">
        <q-input
          v-model="message"
          type="textarea"
          autofocus
          outlined
          hide-bottom-space
          :rules="[validateRequired]"
        />
        <div class="flex justify-end q-gutter-x-sm q-mt-sm">
          <q-btn label="취소" color="dark" unelevated @click="toggleActive" />
          <q-btn
            type="submit"
            label="등록"
            color="primary"
            unelevated
            :loading="isLoading"
          />
        </div>
      </q-form>
    </div>

    <BaseCard v-if="!isActive" class="cursor-pointer" @click="toggleActive">
      <q-card-section class="flex items-center">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png" alt="avatar" />
        </q-avatar>
        <div class="text-grey-6 q-ml-md">댓글을 작성해보세요.</div>
      </q-card-section>
    </BaseCard>

    <CommentList
      :post-id="routeId"
      :items="comments"
      @deleted="deletedComment"
    />
  </div>
</template>

<style lang="scss" scoped></style>
