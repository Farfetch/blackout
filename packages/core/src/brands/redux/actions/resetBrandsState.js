import * as actionTypes from '../actionTypes';

/**
 * Reset state to its initial value.
 *
 * @function resetBrandsState
 * @memberof module:brands/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_BRANDS_STATE,
  });
};
