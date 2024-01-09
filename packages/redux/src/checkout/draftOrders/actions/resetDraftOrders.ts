import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset draft orders state and related entities to its initial value.
 *
 * @returns - Thunk.
 */
const resetDraftOrders = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_DRAFT_ORDERS_STATE,
  });
};

export default resetDraftOrders;
