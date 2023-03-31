<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form class="form" @submit.prevent="submitForm">
        <div>
          <label for="username">id: </label>
          <input id="username" v-model="username" type="text" />
          <p class="validation-text">
            <span v-if="!isUsernameValid && username" class="warning">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <label for="password">password: </label>
          <input id="password" v-model="password" type="text" />
        </div>
        <div>
          <label for="nickname">nickname: </label>
          <input id="nickname" v-model="nickname" type="text" />
        </div>
        <button
          :disabled="!isUsernameValid || !password"
          type="submit"
          class="btn"
        >
          Signup
        </button>
        <p class="log">{{ logMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
  import { registerUser } from '@/apis/auth';
  import { validateEmail } from '@/utils/validation';

  export default {
    data() {
      return {
        username: '',
        password: '',
        nickname: '',
        logMessage: ''
      };
    },
    computed: {
      isUsernameValid() {
        return validateEmail(this.username);
      }
    },
    methods: {
      initForm() {
        this.username = '';
        this.password = '';
        this.nickname = '';
      },
      async submitForm() {
        try {
          const data = {
            username: this.username,
            password: this.password,
            nickname: this.nickname
          };

          const { data: result } = await registerUser(data);
          this.logMessage = `${result.username} 님이 가입되었습니다.`;

          this.initForm();
        } catch (error) {
          console.error(error?.response ?? error);
          this.logMessage = error?.response?.data?.message;
        }
      }
    }
  };
</script>

<style></style>
