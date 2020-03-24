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
    <button type="submit">Login</button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      submitForm() {}
    }
  };
</script>

<style></style>
