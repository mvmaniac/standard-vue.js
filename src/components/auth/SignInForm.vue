<script setup lang="ts">
  import type { UserForm } from 'src/types';

  import { useAsyncState } from '@vueuse/core';
  import { useQuasar } from 'quasar';
  import { ref } from 'vue';

  import DisplayError from 'components/DisplayError.vue';
  import { signInWithGoogle, signInWithEmail } from 'src/services';
  import { getErrorMessage } from 'src/utils/firebase/error-message';

  const $q = useQuasar();

  const form = ref<UserForm>({
    nickname: '',
    email: '',
    password: '',
  });

  const emit = defineEmits<{
    changeView: [view: string];
    closeDialog: [];
  }>();

  // 로그인 (구글)
  const handleSignInGoogle = async () => {
    await signInWithGoogle();
    $q.notify('환영합니다~! :)');
    emit('closeDialog');
  };

  // 로그인 (이메일)
  // 아래는 vueuse로 처리
  const { isLoading, error, execute } = useAsyncState(signInWithEmail, null, {
    immediate: false,
    throwError: true,
    onSuccess: () => {
      $q.notify('환영합니다 :)');
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
  const handleSignInEmail = () => execute(1000, form.value);

  // 아래는 명시적으로 처리
  // const isLoading = ref(false);
  // const error = ref(null);
  // const handleSignInEmail = async () => {
  //   try {
  //     isLoading.value = true;
  //
  //     await signInWithEmail(form.value);
  //     $q.notify('환영합니다 :)');
  //
  //     emit('closeDialog');
  //   } catch (err) {
  //     error.value = err;
  //
  //     $q.notify({
  //       type: 'negative',
  //       message: getErrorMessage(err.code),
  //     });
  //   } finally {
  //     isLoading.value = false;
  //   }
  // };
</script>

<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSignInEmail">
      <q-input v-model="form.email" placeholder="이메일" outlined dense />
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호"
        outlined
        dense
      />
      <DisplayError :code="error?.code" />
      <div>
        <q-btn
          type="submit"
          label="로그인하기"
          class="full-width"
          unelevated
          color="primary"
          :loading="isLoading"
        />
        <div class="flex justify-between">
          <q-btn
            label="비밀번호 찾기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'FindPasswordForm')"
          />
          <q-btn
            label="이메일 가입하기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'SignUpForm')"
          />
        </div>
      </div>

      <q-separator />

      <q-btn
        label="구글 계정으로 로그인하기"
        class="full-width"
        unelevated
        color="primary"
        outline
        @click="handleSignInGoogle"
      />
    </q-form>
  </div>
</template>

<style scoped></style>
