<template>
  <header>
    <div>
      <router-link :to="logoLink" class="logo">
        TIL
        <span class="username">{{ $store.state.username }} </span>
      </router-link>
    </div>
    <div class="navigations">
      <template v-if="isUserLogin">
        <a href="javascript:;" class="logout-button" @click="logoutUser">
          Logout
        </a>
      </template>

      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </template>
    </div>
  </header>
</template>

<script>
  import {deleteAuthCookie, deleteUserCookie} from '@/utils/cookies';

  export default {
    // ...mapGetters로 해도 됨
    computed: {
      isUserLogin() {
        return this.$store.getters.isLogin;
      },
      logoLink() {
        return this.isUserLogin ? '/main' : '/';
      }
    },
    methods: {
      logoutUser() {
        this.$store.commit('CLEAR_USERNAME');

        // deleteCookie('til_auth');
        // deleteCookie('til_user');

        deleteAuthCookie();
        deleteUserCookie();

        this.$router.push('/');
      }
    }
  };
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #927dfc;
    z-index: 2;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  }
  a {
    color: #dedede;
    font-size: 18px;
  }
  a.logo {
    font-size: 30px;
    font-weight: 900;
    color: white;
  }
  .logo > span {
    font-size: 14px;
    font-weight: normal;
  }
  .navigations a {
    margin-left: 10px;
  }
  .fixed {
    position: fixed;
    top: 0;
    width: 100%;
  }
  .logout-button {
    font-size: 14px;
  }
  a.router-link-exact-active {
    color: white;
    font-weight: bold;
  }
  .username {
    color: white;
  }
</style>
