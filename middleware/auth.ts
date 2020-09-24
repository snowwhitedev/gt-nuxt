import { Middleware } from '@nuxt/types';

const authMiddleWare: Middleware = (context) => {
  if (!context.store.getters['auth/Token']) {
    context.redirect('/signin');
  }
};

export default authMiddleWare;
