import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Reset state to its initial value.
 *
 * @memberof module:merchantsLocations/actions
 *
 * @returns {Function} Dispatch reset action.
 */
const resetMerchantsLocationsState =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_MERCHANTS_LOCATIONS_STATE,
    });
  };

export default resetMerchantsLocationsState;
