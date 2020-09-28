import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { namespace } from 'vuex-class';
import GoodTreeAPI from '@/modules/GTAPI';
import { ProductState, RootState } from './interfaces';
import {
  INIT_PRODUCTS,
  FETCH_PRODUCTS,
  SET_PRODUCTS_TO_STORE,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCTS_BY_IDS,
  SET_PRODUCTS_IS_LOADED,
  GET_PRODUCTS_IS_LOADED
} from './actionTypes';

export const state: ProductState = {
  Products: [],
  productsIsLoaded: false
};

export const actions: ActionTree<ProductState, RootState> = {
  [INIT_PRODUCTS]({ dispatch }) {
    // dispatch('LoadProducts', getters.Zone.Vendor);
    dispatch(FETCH_PRODUCTS, 'Oakland');
  },
  [FETCH_PRODUCTS]({ commit }, location) {
    GoodTreeAPI.GetProducts(location).then((products: any) => {
      commit(SET_PRODUCTS_TO_STORE, products);
      commit(SET_PRODUCTS_IS_LOADED, true);
    });
  }
};

export const mutations: MutationTree<ProductState> = {
  [SET_PRODUCTS_TO_STORE](state, value) {
    state.Products = value;
  },
  ClearStore(state) {
    state.Products = [];
  },
  [SET_PRODUCTS_IS_LOADED](state, value) {
    state.productsIsLoaded = value;
  }
};

export const getters: GetterTree<ProductState, RootState> = {
  [GET_PRODUCTS_BY_IDS]: (state) => (ids: string[]) => {
    return state.Products.filter((product) => {
      return ids.includes(product.SKU);
    });
  },
  [GET_PRODUCTS_BY_CATEGORY]: (state) => (type: string) => {
    return state.Products.filter((product) => {
      return product.Type.toLowerCase() === type.toLowerCase();
    });
  },
  getProductsByBrand: (state) => (brand: string) => {
    return state.Products.filter((product) => {
      return product.Brand.toLowerCase() === brand.toLowerCase();
    });
  },
  searchProducts: (state) => (keyword: string) => {
    return state.Products.filter((product) => {
      // loop through keys and see if any field contains keyword
      return Object.keys(product)
        .flatMap((key) => {
          const val = key.toString(); // String(product[key])
          return val.toLowerCase().includes(keyword.toLowerCase());
        })
        .includes(true);
    });
  },
  [GET_PRODUCTS_IS_LOADED]: (state) => state.productsIsLoaded
};

export const productsNameSpace = namespace('products/');

export default {
  state,
  actions,
  mutations,
  getters
};
