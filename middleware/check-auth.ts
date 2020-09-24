import { Middleware } from '@nuxt/types';

const checkAuthMiddleware: Middleware = (context) => {
  context.store.dispatch('auth/initAuth', context.req);
};

export default checkAuthMiddleware;
