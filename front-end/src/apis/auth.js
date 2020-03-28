import {instance} from './index';

// 로그인, 회원가입, 회원탈퇴
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

export {registerUser, loginUser};
