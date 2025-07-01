<script setup lang="ts">
  import { useAsyncState } from '@vueuse/core';
  import axios from 'axios';

  const { state, isLoading, error, isReady, execute } = useAsyncState(
    axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.data),
    { name: '초기값...' },
    {
      immediate: false,
    },
  );

  const handleButton = () => {
    execute(1000);
  };
</script>

<template>
  <q-page padding>
    <div class="text-h4">useAsyncState</div>
    <q-separator spaced />
    <p>
      <button @click="handleButton">execute</button>
    </p>
    <p>isReady: {{ isReady }}</p>
    <p>isLoading: {{ isLoading }}</p>
    <p>error: {{ error }}</p>
    <p>state: {{ state }}</p>
  </q-page>
</template>

<style lang="scss" scoped></style>
