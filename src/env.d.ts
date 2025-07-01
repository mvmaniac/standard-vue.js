/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

declare module 'vue-instantsearch/vue3/es';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
