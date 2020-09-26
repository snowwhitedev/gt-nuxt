import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import GoodTreeAPI from '@/modules/GTAPI';
import { ProductState, RootState } from './interfaces';

const state: ProductState = { Products: [] };

const getters: GetterTree<ProductState, RootState> = {
  getProductsByIds: (state) => (ids: string[]) => {
    return state.Products.filter((product) => {
      return ids.includes(product.SKU);
    });
  },
  getProductsByCategory: (state) => (type: string) => {
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
  }
};

const actions: ActionTree<ProductState, RootState> = {
  InitProduct({ dispatch }) {
    // dispatch('LoadProducts', getters.Zone.Vendor);
    dispatch('LoadProducts', 'Oakland');
  },
  LoadProducts({ commit }, location) {
    GoodTreeAPI.GetProducts(location).then((products: any) => {
      console.log('[products]', products);
      commit('AddProductsToStore', products);
    });
  }
};

const mutations: MutationTree<ProductState> = {
  AddProductsToStore(state, value) {
    state.Products = value;
  },
  ClearStore(state) {
    state.Products = [];
  }
};

export const Products: Module<ProductState, RootState> = {
  state,
  getters,
  actions,
  mutations
};
