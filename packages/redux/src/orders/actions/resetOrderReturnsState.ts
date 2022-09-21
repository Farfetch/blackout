import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { Order } from '@farfetch/blackout-client';

/**
 * Reset orders returns slice state only
 * to its initial value.
 *
 * @returns - Thunk.
 */
const resetOrderReturnsState =
  (orderIds?: Array<Order['id']>) => (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.RESET_ORDER_RETURNS_STATE,
      payload: orderIds,
    });
  };

export default resetOrderReturnsState;
