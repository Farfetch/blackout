import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetReturnPickupRescheduleRequest,
  type PickupRescheduleRequest,
  type Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Obtains the pickup reschedule request.
 *
 * @param getPickupRescheduleRequest - Get pickup reschedule request client.
 *
 * @returns Thunk factory.
 */
const fetchReturnPickupRescheduleRequestFactory =
  (getReturnPickupRescheduleRequest: GetReturnPickupRescheduleRequest) =>
  (id: Return['id'], rescheduleRequestId: string, config?: Config) =>
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUEST_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchReturnPickupRescheduleRequestFactory;
