import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const usePostQuery = () => {
  const route = useRoute();
  const router = useRouter();

  const category = computed({
    get: () => (route.query.category as string) || '',
    set: (val) =>
      router.push({
        query: {
          ...route.query,
          category: val || '',
        },
      }),
  });

  const sort = computed({
    get: () => (route.query.sort as string) || 'createdAt',
    set: (val: string) => router.push({ query: { ...route.query, sort: val } }),
  });

  const tags = computed({
    get: () => {
      // set 할 때 string 형식으로 하기 떄문에 string이 아닌 경우 빈 배열로 반환
      if (typeof route.query.tags !== 'string') {
        return [];
      }
      return route.query.tags?.split(',');
    },
    set: (val) =>
      router.push({
        query: {
          ...route.query,
          tags: val.length === 0 ? [] : val.join(','),
        },
      }),
  });

  return {
    category,
    sort,
    tags,
  };
};
