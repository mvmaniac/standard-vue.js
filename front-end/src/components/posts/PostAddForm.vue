<template>
  <div class="contents">
    <h1 class="page-header">Create Post</h1>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="submitForm">
        <div>
          <label for="title">Title: </label>
          <input id="title" v-model="title" type="text" />
        </div>
        <div>
          <label for="contents">Contents: </label>
          <textarea id="contents" v-model="contents" rows="5" />
          <p v-if="!isContentsValid" class="validation-text warning">
            Contents length must be less than 200
          </p>
        </div>
        <button type="submit" class="btn">Create</button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
  import {createPost} from '@/apis';

  export default {
    data() {
      return {
        title: '',
        contents: '',
        logMessage: ''
      };
    },
    computed: {
      isContentsValid() {
        return this.contents.length <= 200;
      }
    },
    methods: {
      async submitForm() {
        try {
          const response = await createPost({
            title: this.title,
            contents: this.contents
          });
        } catch (error) {
          console.error(error);
          this.logMessage = error.response.data.message;
        }
      }
    }
  };
</script>

<style scoped>
  .form-wrapper .form {
    width: 100%;
  }

  .btn {
    color: white;
  }
</style>
