import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset state to its initial value.
 *
 * @function resetLocaleState
 * @memberof module:locale/actions
 *
 * @returns {Function} - Dispatch reset action.
 */

export default () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_LOCALE_STATE,
  });
};
