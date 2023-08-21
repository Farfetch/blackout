import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { ResetUserClosetItemsStateAction } from '../types/index.js';

/**
 * Reset user closet items slice state only
 * to its initial value.
 *
 * @returns - Thunk.
 */
const resetUserClosetState =
  () => (dispatch: Dispatch<ResetUserClosetItemsStateAction>) => {
    dispatch({
      type: actionTypes.RESET_USER_CLOSET_ITEMS_STATE,
    });
  };

export default resetUserClosetState;
