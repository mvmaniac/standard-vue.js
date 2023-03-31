<template>
  <li>
    <div class="post-title">
      {{ post.title }}
    </div>
    <div class="post-content">
      {{ post.contents }}
    </div>
    <div class="post-time">
      {{ post.createdAt | $filters.formatDate(post.createdAt) }}
      <ion-icon
        name="create-outline"
        class="icon ion-md-create"
        title="Update"
        @click="routePostEditPage"
      ></ion-icon>
      <ion-icon
        name="trash"
        class="icon ion-md-create"
        title="Delete"
        @click="deletePost"
      ></ion-icon>
    </div>
  </li>
</template>

<script>
  import { deletePost } from '@/apis/posts';

  export default {
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    methods: {
      async deletePost() {
        if (window.confirm('You want to delete it?')) {
          await deletePost(this.post._id);
          this.$emit('refresh');
        }
      },
      routePostEditPage() {
        this.$router.push(`/post/${this.post._id}`);
      }
    }
  };
</script>

<style></style>
