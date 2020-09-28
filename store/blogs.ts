import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { namespace } from 'vuex-class';
import { ButterService } from '@/modules/ButterCMS';
import { RootState } from './interfaces';
import { BlogState } from './blogs/types';
import { FETCH_BLOGS, SET_BLOGS, GET_BLOGS } from './actionTypes';

export const state: BlogState = {
  blogs: []
};

export const actions: ActionTree<BlogState, RootState> = {
  async [FETCH_BLOGS]({ commit }) {
    await ButterService.post
      .list({
        page: 1,
        page_size: 10
      })
      .then((res: any) => {
        commit(SET_BLOGS, res.data.data);
      });
  }
};

export const mutations: MutationTree<BlogState> = {
  [SET_BLOGS](state, payload) {
    state.blogs = payload;
  }
};

export const getters: GetterTree<BlogState, RootState> = {
  [GET_BLOGS]: (state) => state.blogs
};

export const blogsNameSpace = namespace('blogs/');

export default {
  state,
  actions,
  mutations,
  getters
};
