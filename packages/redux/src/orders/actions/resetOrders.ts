import * as actionTypes from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @returns - Thunk.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_ORDERS,
  });
};
