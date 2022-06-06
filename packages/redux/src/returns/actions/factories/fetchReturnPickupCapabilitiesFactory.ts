import { adaptDate } from '@farfetch/blackout-client/helpers/adapters';
import {
  FETCH_RETURN_PICKUP_CAPABILITIES_FAILURE,
  FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST,
  FETCH_RETURN_PICKUP_CAPABILITIES_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';
import type {
  GetReturnPickupCapabilities,
  PickupCapabilities,
} from '@farfetch/blackout-client/src/returns/types';

/**
 * Obtains the pickup capabilities for a specific order.
 *
 * @param getPickupCapabilities - Get pickup capabilities client.
 *
 * @returns Thunk factory.
 */
const fetchReturnPickupCapabilitiesFactory =
  (getReturnPickupCapabilities: GetReturnPickupCapabilities) =>
  (id: number, pickupDay: string, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<PickupCapabilities> => {
    dispatch({
      type: FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST,
    });

    try {
      const result = await getReturnPickupCapabilities(id, pickupDay, config);
      const { availableTimeSlots } = result;

      dispatch({
        payload: {
          entities: {
            availableTimeSlots: availableTimeSlots.map(timeSlot => ({
              start: adaptDate(timeSlot.start),
              end: adaptDate(timeSlot.end),
            })),
          },
        },
        type: FETCH_RETURN_PICKUP_CAPABILITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_RETURN_PICKUP_CAPABILITIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnPickupCapabilitiesFactory;
