<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <input id="username" v-model="username" type="text" />
    </div>
    <div>
      <label for="password">password: </label>
      <input id="password" v-model="password" type="text" />
    </div>
    <div>
      <label for="nickname">nickname: </label>
      <input id="nickname" v-model="nickname" type="text" />
    </div>
    <button type="submit">Signup</button>
    <p>{{ logMessage }}</p>
  </form>
</template>

<script>
  import {registerUser} from '@/apis';

  export default {
    data() {
      return {
        username: '',
        password: '',
        nickname: '',
        logMessage: ''
      };
    },
    methods: {
      async submitForm() {
        const data = {
          username: this.username,
          password: this.password,
          nickname: this.nickname
        };

        const {data: result} = await registerUser(data);
        this.logMessage = `${result.username} 님이 가입되었습니다.`;

        this.initForm();
      },
      initForm() {
        this.username = '';
        this.password = '';
        this.nickname = '';
      }
    }
  };
</script>

<style></style>
