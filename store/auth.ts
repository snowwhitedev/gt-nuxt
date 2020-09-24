import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { namespace } from 'vuex-class';
import GoTrue, { User } from 'gotrue-js';
import Cookie from 'js-cookie';
import { RootState, AuthState } from './interfaces';
import { SIGN_UP_USER, SIGN_IN_USER, SET_CURRENT_USER } from './actionTypes';
export const auth = new GoTrue({
  // APIUrl: '/.netlify/identity',
  APIUrl: `${process.env.NUXT_APP_PROXY}/.netlify/identity`,
  audience: '',
  setCookie: true
});

export const state: AuthState = {
  // currentUser: getSavedState('auth.currentUser'),
  currentUser: <User>{},
  token: null,
  loading: false,
  loggedIn: false,
  notifications: []
};

export const actions: ActionTree<AuthState, RootState> = {
  [SIGN_UP_USER]({ dispatch }, credentials) {
    return new Promise((resolve, reject) => {
      auth
        .signup(credentials.email, credentials.password, credentials.attributes)
        .then((response) => {
          // console.log('response', response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }).then(() => {
      // NProgress.done();
      return dispatch(SIGN_IN_USER, credentials);
    });
  },
  [SIGN_IN_USER]({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      auth
        .login(credentials.email, credentials.password, true)
        .then((response) => {
          commit(SET_CURRENT_USER, response);
          commit('setToken', response.token.access_token);
          localStorage.setItem('token', response.token.access_token);
          localStorage.setItem(
            'tokenExpiration',
            response.token.expires_at.toString()
          );
          Cookie.set('jwt', response.token.access_token);
          Cookie.set('expirationDate', response.token.expires_at.toString());
          // console.log('[login response]', response);
          resolve(response);
          // return dispatch('UpdateCustomerStatusServer', response.token.access_token)
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  initAuth({ commit, dispatch }, req) {
    let token;
    let expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find((c: string) => c.trim().startsWith('jwt='));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split('=')[1];
      expirationDate = req.headers.cookie
        .split(';')
        .find((c: string) => c.trim().startsWith('expirationDate='))
        .split('=')[1];
    } else {
      token = localStorage.getItem('token');
      expirationDate = localStorage.getItem('tokenExpiration');
    }
    if (new Date().getTime() > +expirationDate || !token) {
      dispatch('logout');
      return;
    }
    commit('setToken', token);
  },
  logout({ commit }) {
    commit('clearToken');
    Cookie.remove('jwt');
    Cookie.remove('expirationDate');
    if (process.client) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    }
  }
};

export const mutations: MutationTree<AuthState> = {
  [SET_CURRENT_USER](state, value) {
    state.currentUser = value;
    // if (value && analytics) analytics.identify(value.id, {
    //     email: value.user_metadata.email
    // });
    // saveState('auth.currentUser', value);
  },
  setToken(state, value) {
    state.token = value;
  },
  clearToken(state) {
    state.token = null;
  }
};

export const getters: GetterTree<AuthState, RootState> = {
  LoggedIn: (state) => !!state.token,
  User: (state) => state.currentUser,
  Token: (state) => state.token
};

export const authNameSpace = namespace('auth/');
