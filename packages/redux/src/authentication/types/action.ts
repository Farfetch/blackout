import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';

export interface LogoutSuccessAction extends Action {
  type: typeof actionTypes.LOGOUT_SUCCESS;
}
