<script setup lang="ts">
  import type { QueryDocumentSnapshot } from 'firebase/firestore';
  import type { Post, SearchParams } from 'src/types';

  import { vIntersectionObserver } from '@vueuse/components';
  import { useAsyncState } from '@vueuse/core';
  import { computed, ref, watch } from 'vue';

  // import { useRouter } from 'vue-router';
  import PostList from 'components/apps/post/PostList.vue';
  import PostWriteDialog from 'components/apps/post/PostWriteDialog.vue';
  import PostHeader from 'pages/components/PostHeader.vue';
  import PostLeftBar from 'pages/components/PostLeftBar.vue';
  import PostRightBar from 'pages/components/PostRightBar.vue';
  import PostListSkeleton from 'src/components/skeletons/PostListSkeleton.vue';
  import { usePostQuery } from 'src/composables/usePostQuery';
  import { getPosts } from 'src/services';
  import { useAuthStore } from 'stores/auth';

  const postDialog = ref(false);
  const params = computed<SearchParams>(() => ({
    category: category.value,
    sort: sort.value,
    tags: tags.value,
    limit: 10,
    start: undefined,
  }));

  const posts = ref<Post[]>([]);
  const start = ref<QueryDocumentSnapshot | undefined>(undefined);
  const isLoadMore = ref(true);

  const authStore = useAuthStore();
  const { category, sort, tags } = usePostQuery();

  // const router = useRouter();
  // const goPostDetails = id => router.push(`/posts/${id}`);

  const { execute, isLoading } = useAsyncState(
    getPosts,
    { posts: [], lastPost: undefined },
    {
      immediate: false,
      throwError: true,
      onSuccess: (result) => {
        if (start.value) {
          posts.value = posts.value.concat(result.posts);
        } else {
          posts.value = result.posts;
        }

        isLoadMore.value = result.posts.length >= params.value.limit;
        start.value = result.lastPost;
      },
    },
  );

  const openWriteDialog = () => {
    if (!authStore.isAuthenticated) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    postDialog.value = true;
  };

  const completeRegistrationPost = () => {
    postDialog.value = false;
    start.value = undefined;
    execute(0, params.value);
  };

  const loadMore = () => {
    execute(0, { ...params.value, start: start.value });
  };

  // const vIntersectionObserver = {
  //   beforeMount: (el, binding) => {
  //     const observer = new IntersectionObserver(binding.value);
  //     observer.observe(el);
  //   },
  // };

  const handleIntersectionObserver = ([entry]: IntersectionObserverEntry[]) => {
    if (entry?.isIntersecting && isLoadMore.value) {
      console.log('### handleIntersectionObserver ###');
      loadMore();
    }
  };

  watch(
    params,
    () => {
      start.value = undefined;
      execute(0, params.value);
    },
    {
      deep: true,
      // immediate: true, // intersectionObserver를 사용하므로 주석처리
    },
  );
</script>

<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="category" />

      <section class="col-7">
        <PostHeader v-model:sort="sort" />
        <!--
        <q-card v-for="id in 100" :key="id" @click="goPostDetails(id)">
          <q-card-section>{{ id }}번 게시글</q-card-section>
        </q-card>
        -->
        <PostListSkeleton v-if="isLoading" />
        <PostList :items="posts" escapeHTML />

        <q-btn
          v-if="isLoadMore"
          class="full-width q-mt-md"
          label="더보기"
          outline
          @click="loadMore"
        />

        <div v-intersection-observer="handleIntersectionObserver"></div>
      </section>

      <PostRightBar
        class="col-3"
        @open-write-dialog="openWriteDialog"
        v-model:tags="tags"
      />
    </div>
    <!--
      :model-value="postDialog"
      @update:model-value="(val) => (postDialog = val)"
    -->
    <PostWriteDialog
      v-model="postDialog"
      @complete="completeRegistrationPost"
    />
  </q-page>
</template>

<style scoped></style>
