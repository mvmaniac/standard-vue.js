<template>
  <router-view />
</template>

<script setup lang="ts">
  import { onErrorCaptured } from 'vue';

  defineOptions({
    name: 'App',
  });

  // 전역 에러 캡처 방법 2
  onErrorCaptured((err) => {
    console.log('### onErrorCaptured ###');
    console.log('err: ', err);
  });
</script>
