import { adaptDate } from '@farfetch/blackout-client/helpers/adapters';
import {
  FETCH_PICKUP_CAPABILITIES_FAILURE,
  FETCH_PICKUP_CAPABILITIES_REQUEST,
  FETCH_PICKUP_CAPABILITIES_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  GetPickupCapabilities,
  PickupCapabilities,
} from '@farfetch/blackout-client/src/returns/types';

/**
 * @param id     - Return identifier.
 * @param query  - Query parameters for the pickup capabilities.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the pickup capabilities for a specific order.
 *
 * @param getPickupCapabilities - Get pickup capabilities client.
 *
 * @returns Thunk factory.
 */
const fetchPickupCapabilitiesFactory =
  (getPickupCapabilities: GetPickupCapabilities) =>
  (id: number, pickupDay: string, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<PickupCapabilities> => {
    dispatch({
      type: FETCH_PICKUP_CAPABILITIES_REQUEST,
    });

    try {
      const result = await getPickupCapabilities(id, pickupDay, config);
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
        type: FETCH_PICKUP_CAPABILITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PICKUP_CAPABILITIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchPickupCapabilitiesFactory;
