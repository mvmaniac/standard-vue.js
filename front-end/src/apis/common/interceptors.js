import {getAuthFromCookie} from '@/utils/cookies';

export default function setInterceptors(instance) {
  instance.interceptors.request.use(
    (config) => {
      const draftConfig = config;
      draftConfig.headers.Authorization = getAuthFromCookie();
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
