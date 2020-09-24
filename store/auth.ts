import { RootState, AuthState } from './interfaces';
// import { GetterTree, ActionTree, MutationTree, Module } from 'vuex';
import { GetterTree, MutationTree, Module } from 'vuex';
import {ActionTree } from "vuex/types"
import GoTrue, { User } from "gotrue-js";

// import * as jwt_decode from "jwt-decode";
// import GoodTreeAPI from "@/modules/middleware/GTAPI";
// import OnLoginAddressHandler from "@/modules/profile/components/address/OnLoginAddressHandler";
import { SIGN_UP_USER } from "./types";
export const auth = new GoTrue({
  APIUrl: "/.netlify/identity",
  audience: "",
  setCookie: true
});

export const state: AuthState = {
  // currentUser: getSavedState("auth.currentUser"),
  currentUser: <User>{},
  loading: false,
  loggedIn: false,
  notifications: []
};

export const getters: GetterTree<AuthState, RootState> = {
    LoggedIn: state => !!state.currentUser,
    User: state => state.currentUser,
    Token: state => state.currentUser.token.access_token,
};

export const mutations: MutationTree<AuthState> = {
    // SET_CURRENT_USER(state, value) {
    //     state.currentUser = value ? value : null;
    //     if (value && analytics) analytics.identify(value.id, {
    //         email: value.user_metadata.email
    //     });
    //     saveState("auth.currentUser", value);
    // },
};

export const actions: ActionTree<AuthState, RootState> = {
  [SIGN_UP_USER]({ commit, dispatch }, credentials) {
    console.log("[credentials]", credentials);
      // return new Promise((resolve, reject) => {
      //     auth.signup(credentials.email, credentials.password, credentials.attributes)
      //         .then((response) => {
      //             // NProgress.inc();
      //             resolve(response);
      //         })
      //         .catch((error) => {
      //             reject(error);
      //             console.log("It's an error", error);
      //         });
      // }).then(() => {
      //     // NProgress.done();
      //     return dispatch("attemptLogin", credentials);
      // });
  },
}

// function saveState(key, state) {
//     window.localStorage.setItem(key, JSON.stringify(state));
// }
// function getSavedState(key) {
//     return JSON.parse(window.localStorage.getItem(key));
// }

// export const Auth: Module<AuthState, RootState> = {
//   state,
//   getters,
//   actions,
//   mutations
// }

// import { namespace } from "vuex-class";

// export const authNameSpace = namespace()