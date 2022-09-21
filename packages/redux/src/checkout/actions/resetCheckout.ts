import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset checkout state and related entities to its initial value.
 */
const resetCheckout =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_CHECKOUT,
    });
  };

export default resetCheckout;
