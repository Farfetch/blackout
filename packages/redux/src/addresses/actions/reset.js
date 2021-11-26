import { RESET_ADDRESSES } from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @memberof module:addresses/actions
 *
 * @name reset
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_ADDRESSES,
  });
};
