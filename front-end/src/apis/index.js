import axios from 'axios';
import setInterceptors from './common/interceptors';

// 엑시오스 초기화 함수
function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
  });
  return setInterceptors(instance);
}

const instance = createInstance();

// 회원가입 API
function registerUser(data) {
  // const url = 'http://localhost:3000/signup';
  // return axios.post(url, data);
  return instance.post('signup', data);
}

// 로그인 API
function loginUser(data) {
  return instance.post('login', data);
}

// 학습 노트 조회 API
function fetchPosts() {
  return instance.get('posts');
}

// 학습 노트 생성 API
function createPost(data) {
  return instance.post('posts', data);
}

export {registerUser, loginUser, fetchPosts, createPost};
