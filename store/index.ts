import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import products from './products';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: { auth, products }
});

// store.dispatch('init');
