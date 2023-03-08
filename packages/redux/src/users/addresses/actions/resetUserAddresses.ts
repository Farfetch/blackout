import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { ResetUserAddressesAction } from '../types/index.js';

/**
 * Reset state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
const resetUserAddresses =
  () =>
  (dispatch: Dispatch<ResetUserAddressesAction>): void => {
    dispatch({
      type: actionTypes.RESET_USER_ADDRESSES,
    });
  };

export default resetUserAddresses;
