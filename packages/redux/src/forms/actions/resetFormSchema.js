import * as actionTypes from '../actionTypes';

/**
 * Reset all form schemas state to its initial value.
 *
 * @function resetFormSchema
 * @memberof module:forms/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
export default () => dispatch => {
  dispatch({
    type: actionTypes.RESET_SCHEMAS,
  });
};
