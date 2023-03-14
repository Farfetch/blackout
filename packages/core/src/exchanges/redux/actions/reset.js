import { RESET_EXCHANGES } from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @function reset
 * @memberof module:exchanges/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () => dispatch => {
  dispatch({
    type: RESET_EXCHANGES,
  });
};
