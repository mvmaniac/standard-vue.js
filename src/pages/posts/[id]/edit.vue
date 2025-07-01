<script setup lang="ts">
  import type { Post, PostPayload } from 'src/types';
  import type { Ref } from 'vue';

  import { useAsyncState } from '@vueuse/core';
  import { useQuasar } from 'quasar';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  import PostForm from 'components/apps/post/PostForm.vue';
  import BaseCard from 'components/base/BaseCard.vue';
  import { getPost, updatePost } from 'src/services';

  const form: Ref<PostPayload> = ref(getInitialForm());

  // TODO:[yhs] route.params.id 타입 처리?
  const route = useRoute();
  const routeId = (route.params as { id: string }).id;

  const $q = useQuasar();

  useAsyncState<Post>(
    () => getPost(routeId),
    {
      id: '',
      title: '',
      content: '',
      category: '',
      tags: [] as string[],
    },
    {
      onSuccess: (post) => {
        form.value.title = post.title;
        form.value.content = post.content;
        form.value.category = post.category ?? '';
        form.value.tags = post.tags;
      },
    },
  );

  const { isLoading, execute: executeUpdatePost } = useAsyncState(
    updatePost,
    null,
    {
      immediate: false,
      throwError: true,
      onSuccess: () => {
        $q.notify('수정완료!');
      },
    },
  );

  const handleSubmit = async () => {
    if (!confirm('수정 하시겠어요?')) {
      return;
    }
    await executeUpdatePost(1000, routeId, form.value);
  };
</script>
<script lang="ts">
  const getInitialForm = () => ({
    title: '',
    content: '',
    category: '',
    tags: [],
  });
</script>

<template>
  <q-page padding>
    <BaseCard>
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
      </q-toolbar>

      <q-separator />

      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        v-model:tags="form.tags"
        @submit="handleSubmit"
      >
        <template #actions>
          <q-btn flat label="취소" v-close-popup @click="$router.back()" />
          <q-btn
            type="submit"
            flat
            label="수정"
            color="primary"
            :loading="isLoading"
          />
        </template>
      </PostForm>
    </BaseCard>
  </q-page>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  width: 800px
</route>
