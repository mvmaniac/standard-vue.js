<script setup lang="ts">
  import type { PostPayload } from 'src/types';

  import { useQuasar } from 'quasar';
  import { computed, toRef } from 'vue';

  import TiptapEditor from 'components/tiptap/TiptapEditor.vue';
  import { useTag } from 'src/composables/useTag';
  import { getCategories } from 'src/services';
  import { validateRequired } from 'src/utils/validate-rules';

  interface Props extends PostPayload {
    loading?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '',
    content: '',
    category: '',
    tags: () => [],
    loading: false,
  });

  const emit = defineEmits<{
    'update:title': [title: string];
    'update:category': [category: string];
    'update:content': [content: string];
    'update:tags': [tags: string[]];
    submit: [];
  }>();

  const $q = useQuasar();

  const { addTag, removeTag } = useTag({
    tags: toRef(props, 'tags'),
    updateTags: (tags) => emit('update:tags', tags),
  });

  const titleModel = computed({
    get: () => props.title,
    set: (val) => emit('update:title', val),
  });
  const categoryModel = computed({
    get: () => props.category,
    set: (val) => emit('update:category', val),
  });
  const contentModel = computed({
    get: () => props.content,
    set: (val) => emit('update:content', val),
  });

  const categories = getCategories();

  const handleSubmit = () => {
    if (!contentModel.value) {
      $q.notify('내용을 작성하세요.');
      return;
    }

    emit('submit');
  };
</script>

<template>
  <q-form @submit.prevent="handleSubmit">
    <q-card-section class="q-gutter-y-sm">
      <q-input
        v-model="titleModel"
        outlined
        placeholder="제목"
        hide-bottom-space
        :rules="[validateRequired]"
        counter
        maxlength="40"
      />
      <q-select
        v-model="categoryModel"
        outlined
        emit-value
        map-options
        :options="categories"
        hide-bottom-space
        :rules="[validateRequired]"
      >
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>

      <TiptapEditor v-model="contentModel" />

      <!-- model-value 값을 셋팅하지 않으면 IDE에서 에러로 표시해서 빈 문자열을 줌 -->
      <q-input
        model-value=""
        outlined
        placeholder="태그를 입력해주세요~! (입력 후 Enter)"
        prefix="#"
        @keydown.enter.prevent="addTag"
      />
      <q-chip
        v-for="(tag, index) in tags"
        :key="tag"
        outline
        dense
        color="teal"
        removable
        @remove="removeTag(index)"
      >
        {{ tag }}
      </q-chip>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <slot name="actions">
        <q-btn flat label="취소하기" v-close-popup />
        <q-btn
          type="submit"
          flat
          label="저장하기"
          color="primary"
          :loading="loading"
        />
      </slot>
    </q-card-actions>
  </q-form>
</template>

<style lang="scss" scoped></style>
