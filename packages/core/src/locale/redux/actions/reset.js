import * as actionTypes from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @function reset
 * @memberof module:locale/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_LOCALE,
  });
};
