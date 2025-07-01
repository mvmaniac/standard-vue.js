<script setup lang="ts">
  import type { UserForm } from 'src/types';

  import { useAsyncState } from '@vueuse/core';
  import { useQuasar } from 'quasar';
  import { ref } from 'vue';

  import { signUpWithEmail } from 'src/services';
  import { getErrorMessage } from 'src/utils/firebase/error-message';
  import {
    validateRequired,
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
  } from 'src/utils/validate-rules';

  const form = ref<UserForm>({
    nickname: '',
    email: '',
    password: '',
  });
  const passwordConfirm = ref('');

  const emit = defineEmits<{
    changeView: [view: string];
    closeDialog: [];
  }>();

  const $q = useQuasar();
  const { isLoading, execute } = useAsyncState(signUpWithEmail, null, {
    immediate: false,
    onSuccess: () => {
      $q.notify('가입을 환영합니다 :)');
      $q.notify('이메일에서 인증 링크를 확인해주세요.');
      emit('closeDialog');
    },
    onError: (err) => {
      $q.notify({
        type: 'negative',
        message: getErrorMessage(err.code),
      });
    },
  });

  // 1000 delay를 준 이유는 로딩 중 버튼을 확인하기 위해서...
  const handleSubmit = () => execute(1000, form.value);
  // const handleSubmit = async () => {
  //   await signUpWithEmail(form.value);
  //   $q.notify('가입을 환영합니다 :)');
  //   $q.notify('이메일에서 인증 링크를 확인해주세요.');
  //   emit('closeDialog');
  // };
</script>

<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-input
        v-model="form.nickname"
        placeholder="닉네임"
        outlined
        dense
        hide-bottom-space
        :rules="[validateRequired]"
      />
      <q-input
        v-model="form.email"
        placeholder="이메일"
        outlined
        dense
        hide-bottom-space
        :rules="[validateRequired, validateEmail]"
      />
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호(문자, 숫자조합 8자 이상)"
        outlined
        dense
        hide-bottom-space
        :rules="[validateRequired, validatePassword]"
      />
      <q-input
        v-model="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        outlined
        dense
        hide-bottom-space
        :rules="[
          validateRequired,
          (value) => validatePasswordConfirm(form.password, value),
        ]"
      />
      <q-btn
        type="submit"
        label="가입하기"
        class="full-width"
        unelevated
        color="primary"
        :loading="isLoading"
      />

      <q-separator />

      <q-btn
        label="로그인 하기"
        class="full-width"
        unelevated
        flat
        @click="$emit('changeView', 'SignInForm')"
      />
    </q-form>
  </div>
</template>

<style lang="scss" scoped></style>
