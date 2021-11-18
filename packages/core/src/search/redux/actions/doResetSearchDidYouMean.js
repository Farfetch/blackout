import * as actionTypes from '../actionTypes';

/**
 * Reset search did you mean state to its initial value.
 *
 * @function doResetSearchDidYouMean
 * @memberof module:search/actions
 *
 * @returns {Function} Thunk factory.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_SEARCH_DID_YOU_MEAN,
  });
};
