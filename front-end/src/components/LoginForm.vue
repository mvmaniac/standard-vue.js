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
        <button
          :disabled="!isUsernameValid || !password"
          type="submit"
          class="btn"
        >
          Login
        </button>
        <p class="log">{{ logMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
  import {validateEmail} from '@/utils/validation';

  export default {
    data() {
      return {
        username: '',
        password: '',
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
      },
      async submitForm() {
        try {
          const data = {
            username: this.username,
            password: this.password
          };
          await this.$store.dispatch('LOGIN_USER', data);
          this.$router.push('/main');
        } catch (error) {
          console.error(error?.response ?? error);
          this.logMessage = error?.response?.data?.message;
          this.initForm();
        }
      }
    }
  };
</script>

<style scope>
  .btn {
    color: white;
  }
</style>
