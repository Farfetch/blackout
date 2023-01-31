import * as actionTypes from '../actionTypes';

/**
 * Reset search intents state to its initial value.
 *
 * @function doResetSearchIntents
 * @memberof module:search/actions
 *
 * @returns {Function} Thunk factory.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_SEARCH_INTENTS,
  });
};
