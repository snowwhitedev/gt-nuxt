import { ActionContext, ActionTree } from 'vuex/types';
import { CounterState } from './types';
import { RootState } from '../type';

interface CounterActionContext extends ActionContext<CounterState, RootState>{}

export const actions: ActionTree<CounterState, RootState> = {
  increment: ({ commit }: CounterActionContext) => {
      console.log("[increment]");
    commit('increment');
  }
};

export default actions;