import store from '@/stores';

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    (config) => {
      const draftConfig = config;
      draftConfig.headers.Authorization = store.state.token;
      return draftConfig;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return instance;
}

export default {};
