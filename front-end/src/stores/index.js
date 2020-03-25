import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    token: ''
  },
  getters: {
    isLogin: (state) => {
      return state.username !== '';
    }
  },
  mutations: {
    SET_USERNAME(state, username) {
      const draftState = state;
      draftState.username = username;
    },
    CLEAR_USERNAME(state) {
      const draftState = state;
      draftState.username = '';
    },
    SET_TOKEN(state, token) {
      const draftState = state;
      draftState.token = token;
    }
  }
});
