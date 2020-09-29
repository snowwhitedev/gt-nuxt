import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { namespace } from 'vuex-class';
import GoTrue, { User } from 'gotrue-js';
import Cookie from 'js-cookie';
// import jwt_decode from 'jwt-decode';
import { RootState, AuthState } from './interfaces';
import {
  SIGN_UP_USER,
  SIGN_IN_USER,
  SET_CURRENT_USER,
  INIT_PRODUCTS,
  LOG_OUT
} from './actionTypes';

export const auth = new GoTrue({
  // APIUrl: '/.netlify/identity',
  APIUrl: `${process.env.AUTH_BASE_URL}/.netlify/identity`,
  audience: '',
  setCookie: true
});

export const state: AuthState = {
  currentUser: getSavedState('auth.currentUser'),
  token: null,
  loading: false,
  loggedIn: false,
  notifications: []
};

export const actions: ActionTree<AuthState, RootState> = {
  init({ dispatch }) {
    console.log('[xxxx init]');
    dispatch(INIT_PRODUCTS);
    // if (!state.currentUser) return null;
    // return dispatch("UpdateCustomerStatusServer").catch(err => {
    //     console.log("There was error at init: ", err)
    //     dispatch("logout")
    // })
  },

  validate({ commit, state, dispatch }): Promise<any> {
    if (!state.currentUser) return Promise.resolve(null);
    const user = state.currentUser;
    const exp = localStorage.getItem('tokenExpiration');
    if (exp && new Date().getTime() > +exp) {
      // keep users logged in
      const formData = new FormData();
      formData.append('grant_type', 'refresh_token');
      formData.append('refresh_token', user.token.refresh_token);
      return fetch('/.netlify/identity/token', {
        method: 'POST',
        body: formData
      })
        .then((x) => x.json())
        .then((newToken) => {
          user.token.access_token = newToken.access_token;
          user.token.refresh_token = newToken.refresh_token;
          // user.token.expires_at = jwt_decode(newToken.access_token).exp * 1000;
          commit(SET_CURRENT_USER, user);
          return Promise.resolve(user);
        })
        .catch(() => {
          dispatch(LOG_OUT);
          return Promise.resolve(<User>{});
        });
    }

    return Promise.resolve(user);
  },

  [SIGN_UP_USER]({ dispatch }, credentials) {
    return new Promise((resolve, reject) => {
      auth
        .signup(credentials.email, credentials.password, credentials.attributes)
        .then((response) => {
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
      dispatch(LOG_OUT);
      return;
    }
    commit('setToken', token);
  },
  [LOG_OUT]({ commit }) {
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

function getSavedState(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export default {
  state,
  actions,
  mutations,
  getters
};
