import { RESET_ORDERS } from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @returns - Thunk.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_ORDERS,
  });
};
