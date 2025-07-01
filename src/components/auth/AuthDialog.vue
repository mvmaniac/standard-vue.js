<script setup lang="ts">
  import type { Ref } from 'vue';

  import { defineAsyncComponent, ref } from 'vue';

  // import SignInForm from './SignInForm.vue';
  // import SignUpForm from './SignUpForm.vue';
  // import FindPasswordForm from './FindPasswordForm.vue';

  withDefaults(
    defineProps<{
      modelValue: boolean;
    }>(),
    {
      modelValue: false,
    },
  );

  const emit = defineEmits<{
    'update:modelValue': [open: boolean];
  }>();

  // const authViewComponents = {
  //   SignInForm,
  //   SignUpForm,
  //   FindPasswordForm,
  // };
  const authViewComponents = {
    SignInForm: defineAsyncComponent(() => import('./SignInForm.vue')),
    SignUpForm: defineAsyncComponent(() => import('./SignUpForm.vue')),
    FindPasswordForm: defineAsyncComponent(
      () => import('./FindPasswordForm.vue'),
    ),
  };

  type ViewKeys = keyof typeof authViewComponents;

  const viewMode = ref<ViewKeys>('SignInForm'); // SignInForm, SignUpForm, FindPasswordForm
  const changeViewMode = (mode: string) => (viewMode.value = mode as ViewKeys);

  const closeDialog = () => {
    emit('update:modelValue', false);
  };
</script>

<template>
  <q-dialog
    :model-value="modelValue"
    transition-show="none"
    transition-hide="none"
    @update:model-value="(value: boolean) => $emit('update:modelValue', value)"
    @hide="changeViewMode('SignInForm')"
  >
    <q-card :style="{ width: '400px' }">
      <q-card-section class="flex">
        <q-space />
        <q-btn v-close-popup icon="close" flat round dense />
      </q-card-section>
      <q-card-section class="q-px-xl q-pb-xl">
        <!-- v-if 조건부 렌더링 -->
        <!--
        <SignInForm
          v-if="viewMode === 'SignInForm'"
          @change-view="changeViewMode"
        />
        <SignUpForm
          v-else-if="viewMode === 'SignUpForm'"
          @change-view="changeViewMode"
        />
        <FindPasswordForm v-else @change-view="changeViewMode" />
        -->

        <!-- 동적 컴포넌트 -->
        <component
          :is="authViewComponents[viewMode]"
          @change-view="changeViewMode"
          @close-dialog="closeDialog"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
