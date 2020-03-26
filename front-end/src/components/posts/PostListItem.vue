<template>
  <li>
    <div class="post-title">
      {{ post.title }}
    </div>
    <div class="post-content">
      {{ post.contents }}
    </div>
    <div class="post-time">
      {{ post.createdAt }}
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      post: {
        type: Object,
        required: true
      }
    }
  };
</script>

<style></style>
