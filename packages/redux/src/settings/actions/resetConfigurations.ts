import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset configurations state to its initial value.
 *
 * @returns - Dispatch reset action.
 */
const resetConfigurations =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_CONFIGURATIONS_STATE,
    });
  };

export default resetConfigurations;
