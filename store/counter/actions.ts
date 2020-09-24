import { ActionContext, ActionTree } from 'vuex/types';
import { CounterState } from './types';
import { RootState } from '../type';

/**
 * Action context specific to counter module
 */
interface CounterActionContext extends ActionContext<CounterState, RootState>{}

/**
 * Counter actions
 */
export const actions: ActionTree<CounterState, RootState> = {
  increment: ({ commit }: CounterActionContext) => {
      console.log("[increment]");
    commit('increment');
  }
};

export default actions;