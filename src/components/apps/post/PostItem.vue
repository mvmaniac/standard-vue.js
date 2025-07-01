<script setup lang="ts">
  import type { Post } from 'src/types';

  import { useAsyncState } from '@vueuse/core';

  import PostIcon from 'components/apps/post/PostIcon.vue';
  import { useBookmark } from 'src/composables/useBookmark';
  import { useLike } from 'src/composables/useLike';
  import { getUserById } from 'src/services';
  import { formatRelativeTime } from 'src/utils/relative-time-format';

  interface Props {
    item: Post;
    escapeHTML: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    item: (): Post => ({
      id: '',
      title: '',
      content: '',
      readCount: 0,
      commentCount: 0,
      likeCount: 0,
      bookmarkCount: 0,
      createdAt: new Date(),
      tags: [],
    }),
    escapeHTML: false,
  });

  const { isLike, likeCount, toggleLike } = useLike(props.item.id, {
    initialCount: props.item.likeCount || 0,
  });

  const { isBookmark, bookmarkCount, toggleBookmark } = useBookmark(
    props.item.id,
    {
      initialCount: props.item.bookmarkCount || 0,
    },
  );

  const { state: postUser } = useAsyncState(
    () => getUserById(props.item.uid ?? ''),
    null,
  );
</script>

<template>
  <q-item class="bg-white q-pt-md" clickable :to="`/posts/${item.id}`">
    <q-item-section avatar top>
      <q-avatar>
        <img :src="postUser?.photoURL ?? ''" alt="" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex items-center">
        <span>{{ postUser?.displayName }}</span>
        <span class="q-mx-xs">&middot;</span>
        <span>{{ formatRelativeTime(item.createdAt) }}</span>
        <q-chip class="q-ml-md" dense color="primary" text-color="white">
          {{ item.category }}
        </q-chip>
      </div>
      <div class="text-h5 q-mt-sm">{{ item.title }}</div>
      <div class="text-primary text-caption">
        <span v-for="tag in item.tags" :key="tag" class="q-mr-sm">
          #{{ tag }}
        </span>
      </div>
      <div v-if="escapeHTML" class="text-grey-6 q-my-sm ellipsis-2-lines">
        {{ item.content }}
      </div>
      <div
        v-else
        class="text-grey-6 q-my-sm ellipsis-2-lines"
        v-html="item.content"
      ></div>
      <div class="row items-center">
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_visibility"
              :label="item.readCount ?? 0"
              tooltip="조회수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_sms"
              :label="item.commentCount ?? 0"
              tooltip="댓글수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent="toggleLike">
              <PostIcon
                :name="isLike ? 'favorite' : 'sym_o_favorite'"
                :label="likeCount"
                tooltip="좋아요"
              />
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn
              class="full-width"
              flat
              dense
              @click.prevent="toggleBookmark"
            >
              <PostIcon
                :name="isBookmark ? 'bookmark' : 'sym_o_bookmark'"
                :label="bookmarkCount"
                tooltip="북마크"
              />
            </q-btn>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<style lang="scss" scoped></style>
