import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetUserAddressesAction } from '../types';

/**
 * Reset state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
export const resetUserAddresses =
  () =>
  (dispatch: Dispatch<ResetUserAddressesAction>): void => {
    dispatch({
      type: actionTypes.RESET_USER_ADDRESSES,
    });
  };
