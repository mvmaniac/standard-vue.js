<script setup lang="ts">
  import { useAsyncState } from '@vueuse/core';
  import { ref } from 'vue';

  import PostForm from 'components/apps/post/PostForm.vue';
  import { createPost } from 'src/services';
  import { useAuthStore } from 'stores/auth';

  const emit = defineEmits<{
    complete: [];
  }>();

  const form = ref(getInitialForm());

  const authStore = useAuthStore();

  const { isLoading, execute } = useAsyncState(createPost, null, {
    immediate: false,
    throwError: true,
    onSuccess: (postId) => {
      console.log('[dev] postId: ', postId);
      emit('complete');
    },
  });

  const handleSubmit = async () => {
    // 로딩표시를 위해 delay를 줌
    await execute(1000, {
      ...form.value,
      uid: authStore.uid,
    });
  };

  const onHide = () => {
    form.value = getInitialForm();
  };
</script>
<script lang="ts">
  const getInitialForm = () => ({
    title: '',
    category: '',
    content: '',
    tags: [],
  });
</script>

<template>
  <q-dialog
    persistent
    v-bind="$attrs"
    @hide="onHide"
    transition-show="none"
    transition-hide="none"
  >
    <q-card :style="{ width: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close" />
      </q-toolbar>

      <q-separator />

      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        v-model:tags="form.tags"
        :loading="isLoading"
        @submit="handleSubmit"
      />
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
