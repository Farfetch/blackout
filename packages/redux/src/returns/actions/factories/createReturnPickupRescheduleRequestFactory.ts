import * as actionTypes from '../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PickupRescheduleRequest,
  PostReturnPickupRescheduleRequest,
} from '@farfetch/blackout-client/returns/types';

/**
 * Method responsible for creating a pickup reschedule request.
 *
 * @param postReturnPickupRescheduleRequest - Post pickup reschedule request client.
 *
 * @returns Thunk factory.
 */
export const createReturnPickupRescheduleRequestFactory =
  (postReturnPickupRescheduleRequest: PostReturnPickupRescheduleRequest) =>
  (id: string, data: PickupRescheduleRequest, config?: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    dispatch({
      type: actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_REQUEST,
    });

    try {
      const result = await postReturnPickupRescheduleRequest(id, data, config);

      dispatch({
        payload: result,
        type: actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_FAILURE,
      });

      throw error;
    }
  };
