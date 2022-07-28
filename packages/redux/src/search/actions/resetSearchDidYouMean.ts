import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset search did you mean state to its initial value.
 *
 * @returns Thunk factory.
 */
const resetSearchDidYouMean =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_SEARCH_DID_YOU_MEAN,
    });
  };

export default resetSearchDidYouMean;
