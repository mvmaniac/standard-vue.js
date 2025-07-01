<script setup lang="ts">
  import { useAsyncState } from '@vueuse/core';

  import PostList from 'components/apps/post/PostList.vue';
  import { getUserBookmarks } from 'src/services';
  import { useAuthStore } from 'src/stores/auth';

  const authStore = useAuthStore();

  const { state: posts } = useAsyncState(
    () => getUserBookmarks(authStore.uid),
    [],
  );
</script>

<template>
  <PostList :items="posts" />
</template>

<style lang="scss" scoped></style>
