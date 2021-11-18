import * as actionTypes from '../actionTypes';

/**
 * Reset categories state to its initial value.
 *
 * @function reset
 * @memberof module:categories/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_CATEGORIES,
  });
};
