import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

function registerUser(data) {
  // const url = 'http://localhost:3000/signup';
  // return axios.post(url, data);
  return instance.post('signup', data);
}

function loginUser() {
  const url = 'http://localhost:3000/signup';
  return axios.post(url);
}

export {registerUser, loginUser};

export default {};
