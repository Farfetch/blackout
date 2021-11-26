import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset state to its initial value.
 *
 * @memberof module:brands/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
const resetBrandsState =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_BRANDS_STATE,
    });
  };

export default resetBrandsState;
