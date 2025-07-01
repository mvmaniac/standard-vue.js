<script setup lang="ts">
  withDefaults(
    defineProps<{
      sort: string;
    }>(),
    {
      sort: '',
    },
  );

  defineEmits<{
    'update:sort': [sort: string];
  }>();
</script>

<template>
  <div class="flex items-center q-mb-lg">
    <div class="text-h5">전체</div>
    <q-space />
    <q-tabs
      narrow-indicator
      dense
      :model-value="sort"
      @update:model-value="(value) => $emit('update:sort', value)"
    >
      <q-tab :rapple="false" label="최신순" name="createdAt" />
      <q-tab :rapple="false" label="조회순" name="readCount" />
      <q-tab :rapple="false" label="좋아요순" name="likeCount" />
    </q-tabs>
  </div>
</template>

<style lang="scss" scoped></style>
