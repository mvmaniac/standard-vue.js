<script setup lang="ts">
  import PostComments from 'pages/posts/[id]/components/PostComments.vue';
  import PostDetails from 'pages/posts/[id]/components/PostDetails.vue';
</script>

<template>
  <q-page padding>
    <PostDetails />
    <q-separator class="q-my-xl" />
    <PostComments />
  </q-page>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  width: 800ox
</route>
