import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import products from './products';
import blogs from './blogs';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: { auth, products, blogs }
});

// store.dispatch('init');
