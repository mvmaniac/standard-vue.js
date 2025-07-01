<script setup lang="ts">
  import type { Post } from 'src/types';

  import PostItem from 'components/apps/post/PostItem.vue';

  interface Props {
    items: Post[];
    escapeHTML: boolean;
  }

  withDefaults(defineProps<Props>(), {
    items: () => [],
    escapeHTML: false,
  });
</script>

<template>
  <q-list bordered separator>
    <PostItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :escapeHTML="escapeHTML"
    />
  </q-list>
</template>

<style lang="scss" scoped></style>
