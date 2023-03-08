import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Returns a thunk that will dispatch a RESET_SCHEMAS action.
 *
 * @returns Thunk to dispatch reset schemas.
 */

const resetFormSchema =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_FORM_SCHEMAS,
    });
  };

export default resetFormSchema;
