import { Middleware } from  "@nuxt/types";

const authMiddleWare: Middleware = (context) => {
  console.log("[middle ware]", context.store.getters['auth/Token']);
  // context.store.dispatch("auth/initAuth", context.req);
  // console.log("")
  if (!context.store.getters['auth/Token']) {
    context.redirect("/signin");
  }
}

export default authMiddleWare;