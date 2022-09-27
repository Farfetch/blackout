import * as actionTypes from '../../actionTypes';
import { adaptDate } from '../../../helpers/adapters';
import {
  Config,
  GetReturnPickupCapability,
  Return,
  ReturnPickupCapability,
  toBlackoutError,
} from '@farfetch/blackout-client';
import generateReturnPickupCapabilityHash from '../../helpers/generateReturnPickupCapabilityHash';
import type { Dispatch } from 'redux';

/**
 * Obtains the pickup capability for a specific return and pickup day.
 *
 * @param getReturnPickupCapability - Get return pickup capability client.
 *
 * @returns Thunk factory.
 */
const fetchReturnPickupCapabilityFactory =
  (getReturnPickupCapability: GetReturnPickupCapability) =>
  (returnId: Return['id'], pickupDay: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<ReturnPickupCapability> => {
    const hash = generateReturnPickupCapabilityHash(returnId, pickupDay);

    dispatch({
      meta: { hash },
      type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_REQUEST,
    });

    try {
      const result = await getReturnPickupCapability(
        returnId,
        pickupDay,
        config,
      );
      const { availableTimeSlots } = result;

      dispatch({
        meta: { hash },
        payload: {
          entities: {
            returnPickupCapabilities: {
              [hash]: {
                ...result,
                availableTimeSlots: availableTimeSlots.map(timeSlot => ({
                  start: adaptDate(timeSlot.start),
                  end: adaptDate(timeSlot.end),
                })),
              },
            },
          },
        },
        type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { hash },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnPickupCapabilityFactory;
