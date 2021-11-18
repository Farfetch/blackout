import * as actionTypes from '../actionTypes';

/**
 * Reset search suggestions state to its initial value.
 *
 * @function doResetSearchSuggestions
 * @memberof module:search/actions
 *
 * @returns {Function} Thunk factory.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_SEARCH_SUGGESTIONS,
  });
};
