import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import products from './products';
import blogs from './blogs';
import order from './order';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: { auth, products, blogs, order }
});

// store.dispatch('init');
