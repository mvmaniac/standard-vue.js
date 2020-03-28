import Vue from 'vue';
import router from '@/routes';
import store from '@/stores';
import formatDate from '@/utils/filters';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/];

Vue.filter('formatDate', formatDate);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
