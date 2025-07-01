<script setup lang="ts">
  import type { Post } from 'src/types';

  import 'instantsearch.css/themes/algolia-min.css';
  import { liteClient as algoliasearch } from 'algoliasearch/lite';
  import {
    AisInstantSearch,
    AisSearchBox,
    AisConfigure,
    AisPanel,
    AisRefinementList,
    AisHits,
    AisPagination,
  } from 'vue-instantsearch/vue3/es';

  import PostList from 'components/apps/post/PostList.vue';

  const searchClient = algoliasearch(
    'RKF5IAISIH',
    'cf927ae23f64b2753d30f87f139532f4',
  );

  const transformItems = (items): Post[] => {
    console.log('items: ', items);

    return items.map((item) => ({
      id: item.objectID,
      title: item.title,
      content: item._snippetResult.content.value,
      category: item.category,
      tags: item.tags,
      createdAt: new Date(item.createdAt),
      readCount: item.readCount,
      likeCount: item.likeCount,
      bookmarkCount: item.bookmarkCount,
      commentCount: item.commentCount,
      uid: item.uid,
    }));
  };
</script>

<template>
  <q-page padding>
    <ais-instant-search :search-client="searchClient" index-name="dev_posts">
      <ais-configure :hits-per-page.camel="8" />
      <div class="row q-col-gutter-x-lg">
        <section class="col-3">
          <q-card flat bordered class="q-pa-md">
            <ais-panel>
              <template #header>카테고리</template>
              <template #default>
                <ais-refinement-list attribute="category" />
              </template>
            </ais-panel>
          </q-card>
          <q-card flat bordered class="q-pa-md q-mt-md">
            <ais-panel>
              <template #header>태그</template>
              <template #default>
                <ais-refinement-list attribute="tags" />
              </template>
            </ais-panel>
          </q-card>
        </section>
        <section class="col-9">
          <ais-search-box />
          <q-separator spaced />
          <ais-hits :transform-items="transformItems">
            <template v-slot="{ items }">
              <PostList :items="items" :escapeHTML="false" />
            </template>
          </ais-hits>

          <div class="pagination flex flex-center q-mt-md">
            <ais-pagination />
          </div>
        </section>
      </div>
    </ais-instant-search>
  </q-page>
</template>

<style lang="scss">
  .ais-RefinementList-label {
    display: flex;
    align-items: center;
    width: 100%;
    text-transform: lowercase;
    cursor: pointer;
  }

  .ais-RefinementList-label > * {
    display: inline-block;
  }

  .ais-RefinementList-label > .ais-RefinementList-checkbox {
    margin-right: 6px;
  }

  .ais-RefinementList-label > .ais-RefinementList-labelText {
    flex-grow: 1;
  }

  .ais-RefinementList-label > .ais-RefinementList-count {
    padding: 0.01rem 0.4rem;
    border-radius: 50%;
  }
</style>
