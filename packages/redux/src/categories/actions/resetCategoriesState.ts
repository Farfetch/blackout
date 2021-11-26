import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset categories state to its initial value.
 *
 * @memberof module:categories/actions
 *
 * @returns {Function} - Dispatch reset action.
 */
const resetCategoriesState =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_CATEGORIES_STATE,
    });
  };

export default resetCategoriesState;
