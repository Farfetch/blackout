import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset search suggestions state to its initial value.
 *
 * @returns Thunk factory.
 */
const resetSearchSuggestions =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_SEARCH_SUGGESTIONS,
    });
  };

export default resetSearchSuggestions;
