import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Reset state to its initial value.
 *
 * @returns Dispatch reset action.
 */
const resetMerchantsLocationsState =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_MERCHANTS_LOCATIONS_STATE,
    });
  };

export default resetMerchantsLocationsState;
