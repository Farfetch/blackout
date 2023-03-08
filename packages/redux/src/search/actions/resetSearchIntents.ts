import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset search intents state to its initial value.
 *
 * @returns Thunk factory.
 */
const resetSearchIntents =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_SEARCH_INTENTS,
    });
  };

export default resetSearchIntents;
