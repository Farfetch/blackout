import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';
import type { Return } from '@farfetch/blackout-client';

/**
 * Reset return pickup capability state.
 *
 * @returns Thunk factory.
 */
const resetReturnPickupCapability =
  (
    returnPickupCapabilitiesToReset: Array<{
      returnId: Return['id'];
      pickupDay: string;
    }>,
  ) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.RESET_RETURN_PICKUP_CAPABILITY_STATE,
      payload: returnPickupCapabilitiesToReset,
    });
  };

export default resetReturnPickupCapability;
