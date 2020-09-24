import { ActionContext, ActionTree } from 'vuex/types';
import { RootState } from '../type';
import { CounterState } from './types';

interface CounterActionContext extends ActionContext<CounterState, RootState> {}

export const actions: ActionTree<CounterState, RootState> = {
  increment: ({ commit }: CounterActionContext) => {
    commit('increment');
  }
};

export default actions;
