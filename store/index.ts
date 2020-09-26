import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import { Products } from './products';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: { auth, Products }
});

store.dispatch('init');
