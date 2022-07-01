import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  GetReturnPickupRescheduleRequest,
  PickupRescheduleRequest,
} from '@farfetch/blackout-client/returns/types';

/**
 * Obtains the pickup reschedule request.
 *
 * @param getPickupRescheduleRequest - Get pickup reschedule request client.
 *
 * @returns Thunk factory.
 */
export const fetchReturnPickupRescheduleRequestFactory =
  (getReturnPickupRescheduleRequest: GetReturnPickupRescheduleRequest) =>
  (id: string, rescheduleRequestId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<PickupRescheduleRequest> => {
    dispatch({
      type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_REQUEST,
    });

    try {
      const result = await getReturnPickupRescheduleRequest(
        id,
        rescheduleRequestId,
        config,
      );

      dispatch({
        payload: result,
        type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_FAILURE,
      });

      throw error;
    }
  };
