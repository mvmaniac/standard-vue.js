import { createApp } from 'vue';

import router from '@/routes';
import store from '@/stores';
import formatDate from '@/utils/filters';
import { plugin as bus } from './plugins/bus';
import App from './App.vue';

const app = createApp(App);

app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ion-');
app.config.globalProperties.$filters = {
  formatDate
};

app.use(router).use(store).use(bus).mount('#app');
