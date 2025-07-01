import type { Ref } from 'vue';

import { useQuasar } from 'quasar';

export interface UseTagOptions {
  tags: Ref<string[]>;
  updateTags: (tags: string[]) => void;
  maxLengthMessage?: string;
}

export const useTag = (options: UseTagOptions) => {
  const $q = useQuasar();
  
  const { tags, updateTags, maxLengthMessage } = options || {};

  const addTag = (
    newTag: string | (KeyboardEvent & { target: HTMLInputElement }),
  ) => {
    const isEventHandler = typeof newTag !== 'string';
    const tagValue = isEventHandler
      ? newTag.target.value.replace(/ /g, '')
      : newTag.replace(/ /g, '');

    if (!tagValue) {
      return;
    }

    if (tags.value.length >= 10) {
      $q.notify(maxLengthMessage || '태그는 10개 이상 등록할 수 없습니다');
      return;
    }

    if (!tags.value.includes(tagValue)) {
      updateTags([...tags.value, tagValue]);
    }

    if (isEventHandler) {
      newTag.target.value = '';
    }
  };

  const removeTag = (index: number) => {
    const model = [...tags.value];
    model.splice(index, 1);
    updateTags(model);
  };

  return {
    addTag,
    removeTag,
  };
};
