import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
const resetBrands =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_BRANDS_STATE,
    });
  };

export default resetBrands;
