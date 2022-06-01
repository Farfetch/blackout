import { RESET_ADDRESSES } from '../actionTypes';
import type { Dispatch } from 'redux';
import type { ResetAddressesAction } from '../types';

/**
 * Reset state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
export default () =>
  (dispatch: Dispatch<ResetAddressesAction>): void => {
    dispatch({
      type: RESET_ADDRESSES,
    });
  };
