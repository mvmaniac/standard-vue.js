import { defineBoot } from '#q-app/wrappers';
import { Notify } from 'quasar';

import { getErrorMessage } from 'src/utils/firebase/error-message';

export default defineBoot(({ app }) => {
  // 전역 에러 캡처 방법 1
  app.config.errorHandler = (err, instance, info) => {
    console.log('### app.config.errorHandler ###');
    console.log('err: ', err);
    console.log('instance: ', instance);
    console.log('info: ', info);

    Notify.create(getErrorMessage(err.code));
  };
});
