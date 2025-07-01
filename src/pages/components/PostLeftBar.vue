<script setup lang="ts">
  import type { Category } from 'src/types';

  import StickySideBar from 'components/StickySideBar.vue';

  withDefaults(
    defineProps<{
      category: string;
    }>(),
    {
      category: '',
    },
  );

  const emit = defineEmits<{
    'update:category': [category: string];
  }>();

  const changeCategory = (category: string) => {
    emit('update:category', category);
  };

  const categories: Category[] = [
    { label: 'Q&A', value: 'qna' },
    { label: '커뮤니티', value: 'community' },
    { label: '공지사항', value: 'notice' },
    { label: '강의', value: 'lecture' },
  ];
</script>

<template>
  <StickySideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          :active="category === ''"
          @click="changeCategory('')"
        >
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item
          v-for="cate in categories"
          :key="cate.value"
          clickable
          v-ripple
          :active="category === cate.value"
          @click="changeCategory(cate.value)"
        >
          <q-item-section>{{ cate.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<style lang="scss" scoped></style>
