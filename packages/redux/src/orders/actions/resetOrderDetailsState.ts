import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { Order } from '@farfetch/blackout-client';

/**
 * Reset orders details slice state only
 * to its initial value.
 *
 * @param orderIds - Order ids whose state should be reset.
 *
 * @returns - Thunk.
 */
const resetOrderDetailsState =
  (orderIds?: Array<Order['id']>) => (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.RESET_ORDER_DETAILS_STATE,
      payload: orderIds,
    });
  };

export default resetOrderDetailsState;
