import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset categories state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
const resetCategories =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_CATEGORIES_STATE,
    });
  };

export default resetCategories;
