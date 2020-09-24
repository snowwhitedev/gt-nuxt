import { Middleware } from  "@nuxt/types";

const checkAuthMiddleware: Middleware = (context) => {
  console.log("[Middleware] Check Auth");
  context.store.dispatch("auth/initAuth", context.req);
}

export default checkAuthMiddleware;