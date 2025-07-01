<script setup lang="ts">
  import { computed } from 'vue';

  import { getErrorMessage } from 'src/utils/firebase/error-message';

  interface Props {
    code: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    code: '',
  });

  const errorMessage = computed(() => getErrorMessage(props.code));
</script>

<template>
  <div v-if="code" class="text-red text-center">{{ errorMessage }}</div>
</template>

<style lang="scss" scoped></style>
