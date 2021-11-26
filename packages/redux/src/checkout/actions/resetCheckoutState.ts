import { RESET_CHECKOUT_STATE } from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset the checkout state.
 *
 * @memberof module:checkout/actions
 *
 * @name resetCheckoutState
 *
 * @returns {ResetCheckoutStateThunkFactory}
 */
export default () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: RESET_CHECKOUT_STATE,
    });
  };
