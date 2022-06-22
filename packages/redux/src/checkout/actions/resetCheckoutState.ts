import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset the checkout state.
 */
export default () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_CHECKOUT_STATE,
    });
  };
