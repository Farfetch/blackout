import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetUserStateAction } from '../../types';

/**
 * Reset user state to its initial value.
 *
 * @returns Dispatch reset user state action.
 */
const resetUserState =
  (fieldsToReset?: string[]) =>
  (dispatch: Dispatch<ResetUserStateAction>): void => {
    dispatch({
      payload: { fieldsToReset },
      type: actionTypes.RESET_USER_STATE,
    });
  };

export default resetUserState;
