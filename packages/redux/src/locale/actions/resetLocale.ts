import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset locale state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
const resetLocale = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.RESET_LOCALE_STATE,
  });
};

export default resetLocale;
