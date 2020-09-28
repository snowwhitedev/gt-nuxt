import { Middleware } from '@nuxt/types';
import { GET_PRODUCTS_IS_LOADED, INIT_PRODUCTS } from '../store/actionTypes';

const productsMiddleWare: Middleware = (context) => {
  if (!context.store.getters[`products/${GET_PRODUCTS_IS_LOADED}`]) {
    context.store.dispatch(`products/${INIT_PRODUCTS}`);
  }
};

export default productsMiddleWare;
