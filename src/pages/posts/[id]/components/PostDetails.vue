<script setup lang="ts">
  import type { Post, User } from 'src/types';

  import { useAsyncState } from '@vueuse/core';
  import { date, useQuasar } from 'quasar';
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  import PostIcon from 'components/apps/post/PostIcon.vue';
  import BaseCard from 'components/base/BaseCard.vue';
  import TiptapViewer from 'components/tiptap/TiptapViewer.vue';
  import { useBookmark } from 'src/composables/useBookmark';
  import { useLike } from 'src/composables/useLike';
  import { deletePost, getPostDetails } from 'src/services';
  import { useAuthStore } from 'stores/auth';

  const { hasOwnContent } = useAuthStore();

  // TODO:[yhs] route.params.id 타입 처리?
  const route = useRoute();
  const routeId = (route.params as { id: string }).id;

  const router = useRouter();
  const $q = useQuasar();

  const { execute: executeGetPost } = useAsyncState<{
    post: Post;
    postUser: User;
  }>(
    () => getPostDetails(routeId),
    {
      post: getInitialPost(),
      postUser: getInitialUser(),
    },
    {
      immediate: false,
      onSuccess: (result) => {
        post.value = result.post;
        postUser.value = result.postUser;

        updateLikeCount(post.value.likeCount ?? 0);
        updateBookmarkCount(post.value.bookmarkCount ?? 0);
      },
    },
  );

  const { execute: executeDeletePost } = useAsyncState(deletePost, null, {
    immediate: false,
    onSuccess: () => {
      $q.notify('삭제완료!');
      router.push('/');
    },
  });

  const { isLike, likeCount, toggleLike, updateLikeCount } = useLike(routeId);
  const { isBookmark, bookmarkCount, toggleBookmark, updateBookmarkCount } =
    useBookmark(routeId);

  const post = ref<Post>(getInitialPost());
  const postUser = ref<User>(getInitialUser());

  const handleDeletePost = async () => {
    if (!confirm('삭제 하시겠어요?')) {
      return;
    }
    await executeDeletePost(0, routeId);
  };

  onMounted(async () => {
    const fetched = await executeGetPost(0);
    if (!fetched) return;
    post.value = fetched.post;
  });
</script>
<script lang="ts">
  const getInitialPost = (): Post => ({
    id: '',
    title: '',
    content: '',
    readCount: 0,
    commentCount: 0,
    likeCount: 0,
    bookmarkCount: 0,
    createdAt: new Date(),
    tags: [],
    uid: '',
  });

  const getInitialUser = (): User => ({
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
    createdAt: new Date(),
  });
</script>

<template>
  <BaseCard class="q-pa-lg">
    <div class="flex q-mb-md">
      <q-btn
        icon="sym_o_arrow_back"
        flat
        round
        dense
        color="grey"
        size="16px"
        @click="$router.back()"
      />
      <q-space />
      <q-btn
        :icon="isLike ? 'favorite' : 'sym_o_favorite'"
        flat
        round
        dense
        color="red"
        size="16px"
        @click="toggleLike"
      />
      <q-btn
        :icon="isBookmark ? 'bookmark' : 'sym_o_bookmark'"
        flat
        round
        dense
        color="blue"
        size="16px"
        @click="toggleBookmark"
      />
    </div>
    <div class="flex items-center">
      <q-avatar>
        <img :src="postUser?.photoURL ?? ''" alt="" />
      </q-avatar>
      <div class="q-ml-md">
        <div>{{ postUser?.displayName }}</div>
        <div class="text-grey-6">
          {{ date.formatDate(post.createdAt, 'YYYY. MM. DD HH:mm:ss') }}
        </div>
      </div>
      <q-space />
      <q-btn v-if="hasOwnContent(post.uid ?? '')" icon="more_horiz" round flat>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item v-close-popup clickable :to="`/posts/${routeId}/edit`">
              <q-item-section>수정하기</q-item-section>
            </q-item>
            <q-item v-close-popup clickable @click="handleDeletePost">
              <q-item-section>삭제하기</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="q-mt-md text-h5 text-weight-bold">
      {{ post.title }}
    </div>

    <div class="text-teal">
      <span v-for="tag in post.tags" :key="tag">#{{ tag }}&nbsp;</span>
      {{ post.category }}
    </div>

    <div class="row items-center q-gutter-x-md q-mt-md justify-end">
      <PostIcon name="sym_o_visibility" :label="post.readCount ?? 0" />
      <PostIcon name="sym_o_sms" :label="post.commentCount ?? 0" />
      <PostIcon name="sym_o_favorite" :label="likeCount" />
      <PostIcon name="sym_o_bookmark" :label="bookmarkCount" />
    </div>

    <q-separator class="q-my-lg" />

    <TiptapViewer v-if="post.content" :content="post.content" />
  </BaseCard>
</template>

<style lang="scss" scoped></style>
