import {
  FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_FAILURE,
  FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_REQUEST,
  FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetReturnPickupRescheduleRequest,
  PickupRescheduleRequest,
} from '@farfetch/blackout-client/src/returns/types';

/**
 * Obtains the pickup reschedule request.
 *
 * @param getPickupRescheduleRequest - Get pickup reschedule request client.
 *
 * @returns Thunk factory.
 */
const fetchReturnPickupRescheduleRequestFactory =
  (getReturnPickupRescheduleRequest: GetReturnPickupRescheduleRequest) =>
  (id: string, rescheduleRequestId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<PickupRescheduleRequest> => {
    dispatch({
      type: FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_REQUEST,
    });

    try {
      const result = await getReturnPickupRescheduleRequest(
        id,
        rescheduleRequestId,
        config,
      );

      dispatch({
        payload: result,
        type: FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnPickupRescheduleRequestFactory;
