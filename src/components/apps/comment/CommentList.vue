<script setup lang="ts">
  import type { Comment } from 'src/types';

  import { useAsyncState } from '@vueuse/core';

  import CommentItem from 'components/apps/comment/CommentItem.vue';
  import { deleteComment } from 'src/services';

  interface Props {
    postId: string;
    items: Comment[];
  }

  const props = withDefaults(defineProps<Props>(), {
    postId: '',
    items: () => [],
  });

  const emit = defineEmits<{
    deleted: [];
  }>();

  const { execute } = useAsyncState(deleteComment, null, {
    immediate: false,
    onSuccess: () => {
      emit('deleted');
    },
  });

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('삭제 하시겠어요?')) {
      return;
    }
    await execute(0, props.postId, commentId);
  };
</script>

<template>
  <q-list class="q-mt-lg bg-white" bordered separator>
    <CommentItem
      v-for="item in items"
      :key="item.id"
      v-bind="item"
      @delete="handleDeleteComment"
    />
  </q-list>
</template>

<style lang="scss" scoped></style>
