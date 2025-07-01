import { defineBoot } from '#q-app/wrappers';
import InstantSearch from 'vue-instantsearch/vue3/es';

export default defineBoot(({ app }) => {
  app.use(InstantSearch);
});
