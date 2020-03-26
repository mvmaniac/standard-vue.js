<template>
  <div class="main list-container contents">
    <h1 class="page-header">Today I Learned</h1>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <ul v-else>
      <post-list-item
        v-for="post in posts"
        :key="post._id"
        :post="post"
      ></post-list-item>
    </ul>
  </div>
</template>

<script>
  import PostListItem from '@/components/posts/PostListItem.vue';
  import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

  import {fetchPosts} from '@/apis';

  export default {
    components: {
      PostListItem,
      LoadingSpinner
    },
    data() {
      return {
        posts: [],
        isLoading: false
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        this.isLoading = true;

        const {data} = await fetchPosts();
        this.posts = data.posts;

        this.isLoading = false;
      }
    }
  };
</script>

<style></style>
