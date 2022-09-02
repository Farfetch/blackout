import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { Order } from '@farfetch/blackout-client';

/**
 * Reset orders details slice state only
 * to its initial value.
 *
 * @returns - Thunk.
 */
const resetOrderDetailsState =
  (orderId: Order['id']) => (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.RESET_ORDER_DETAILS_STATE,
      payload: { orderId },
    });
  };

export default resetOrderDetailsState;
