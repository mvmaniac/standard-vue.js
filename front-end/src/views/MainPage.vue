<template>
  <div class="main list-container contents">
    <h1 class="page-header">Today I Learned</h1>
    <ul>
      <li v-for="post in items" :key="post._id">
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>

<script>
  import {fetchPosts} from '@/apis';

  export default {
    data() {
      return {
        items: []
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        const {data} = await fetchPosts();
        this.items = data.posts;
      }
    }
  };
</script>

<style></style>
