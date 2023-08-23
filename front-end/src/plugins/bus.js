import { inject } from 'vue';
import mitt from 'mitt';

const key = Symbol('mitt');

export const useBus = () => inject(key);

export const plugin = {
  install: (globalApp) => {
    const app = globalApp;
    const emitter = mitt();

    app.provide(key, emitter); // Composition API 지원
    app.config.globalProperties.$bus = emitter; // Options API 지원
  },
};
