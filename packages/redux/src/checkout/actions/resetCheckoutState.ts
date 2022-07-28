import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset the checkout state.
 */
const resetCheckoutState =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_CHECKOUT_STATE,
    });
  };

export default resetCheckoutState;
