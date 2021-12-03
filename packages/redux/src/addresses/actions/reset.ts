import { RESET_ADDRESSES } from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetAddressesAction } from '../types';

/**
 * Reset state to its initial value.
 *
 * @memberof module:addresses/actions
 *
 * @name reset
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () =>
  (dispatch: Dispatch<ResetAddressesAction>): void => {
    dispatch({
      type: RESET_ADDRESSES,
    });
  };
