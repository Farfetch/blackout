import * as actionTypes from '../../actionTypes';
import { adaptDate } from '../../../helpers/adapters';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  GetReturnPickupCapabilities,
  PickupCapabilities,
} from '@farfetch/blackout-client/returns/types';

/**
 * Obtains the pickup capabilities for a specific order.
 *
 * @param getPickupCapabilities - Get pickup capabilities client.
 *
 * @returns Thunk factory.
 */
export const fetchReturnPickupCapabilitiesFactory =
  (getReturnPickupCapabilities: GetReturnPickupCapabilities) =>
  (id: number, pickupDay: string, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<PickupCapabilities> => {
    dispatch({
      type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST,
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
        type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_FAILURE,
      });

      throw error;
    }
  };
