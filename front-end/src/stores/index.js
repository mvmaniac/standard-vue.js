import { createStore } from 'vuex';

import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie
} from '@/utils/cookies';

import { loginUser } from '@/apis/auth';

export default createStore({
  state: {
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || ''
  },
  getters: {
    isLogin: (state) => state.username !== ''
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
    },
    CLEAR_TOKEN(state) {
      const draftState = state;
      draftState.token = '';
    }
  },
  actions: {
    async LOGIN_USER({ commit }, data) {
      const { data: result } = await loginUser(data);

      commit('SET_USERNAME', result.user.username);
      commit('SET_TOKEN', result.token);

      saveAuthToCookie(result.token);
      saveUserToCookie(result.user.username);

      return result;
    }
  }
});
