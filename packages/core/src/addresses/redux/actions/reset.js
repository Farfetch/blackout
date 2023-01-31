import { RESET_ADDRESSES } from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @function reset
 * @memberof module:addresses/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_ADDRESSES,
  });
};
