import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Returns a thunk that will dispatch a RESET_SCHEMAS action.
 *
 * @returns {Function} Thunk to dispatch reset schemas.
 */
export default () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_SCHEMAS,
    });
  };
