import {
  FETCH_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
  FETCH_PICKUP_RESCHEDULE_REQUESTS_REQUEST,
  FETCH_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetPickupRescheduleRequests,
  PickupRescheduleRequests,
} from '@farfetch/blackout-client/src/returns/types';

/**
 * Obtains the pickup reschedule requests.
 *
 * @param getPickupRescheduleRequests - Get pickup reschedule requests client.
 *
 * @returns Thunk factory.
 */
const fetchPickupRescheduleRequestsFactory =
  (getPickupRescheduleRequests: GetPickupRescheduleRequests) =>
  (id: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<PickupRescheduleRequests> => {
    try {
      dispatch({
        type: FETCH_PICKUP_RESCHEDULE_REQUESTS_REQUEST,
      });

      const result = await getPickupRescheduleRequests(id, config);

      dispatch({
        payload: result,
        type: FETCH_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchPickupRescheduleRequestsFactory;
