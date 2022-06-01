import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset search suggestions state to its initial value.
 *
 * @returns Thunk factory.
 */
export default () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_SEARCH_SUGGESTIONS,
    });
  };
