import {
  CREATE_PICKUP_RESCHEDULE_REQUEST_FAILURE,
  CREATE_PICKUP_RESCHEDULE_REQUEST_REQUEST,
  CREATE_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  PickupRescheduleRequest,
  PostPickupRescheduleRequest,
} from '@farfetch/blackout-client/src/returns/types';

/**
 * Method responsible for creating a pickup reschedule request.
 *
 * @param postPickupRescheduleRequest - Post pickup reschedule request client.
 *
 * @returns Thunk factory.
 */
const createPickupRescheduleRequestFactory =
  (postPickupRescheduleRequest: PostPickupRescheduleRequest) =>
  (id: string, data: PickupRescheduleRequest, config?: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    try {
      dispatch({
        type: CREATE_PICKUP_RESCHEDULE_REQUEST_REQUEST,
      });

      const result = await postPickupRescheduleRequest(id, data, config);

      dispatch({
        payload: result,
        type: CREATE_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: CREATE_PICKUP_RESCHEDULE_REQUEST_FAILURE,
      });

      throw error;
    }
  };

export default createPickupRescheduleRequestFactory;
