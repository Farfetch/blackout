import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';
import type { Order } from '@farfetch/blackout-client';

/**
 * Reset orders return options slice state only
 * to its initial value.
 *
 * @returns - Thunk.
 */
const resetOrderReturnOptionsState =
  (orderIds?: Array<Order['id']>) => (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.RESET_ORDER_RETURN_OPTIONS_STATE,
      payload: orderIds,
    });
  };

export default resetOrderReturnOptionsState;
