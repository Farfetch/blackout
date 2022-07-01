import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
export interface ResetUserStateAction extends Action {
  type: typeof actionTypes.RESET_USER_STATE;
}

export interface ResetUserEntitiesAction extends Action {
  type: typeof actionTypes.RESET_USER_ENTITIES;
}

export type ResetUserAction = ResetUserStateAction | ResetUserEntitiesAction;
