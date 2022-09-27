import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetReturnPickupRescheduleRequests,
  PickupRescheduleRequests,
  Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Obtains the pickup reschedule requests.
 *
 * @param getPickupRescheduleRequests - Get pickup reschedule requests client.
 *
 * @returns Thunk factory.
 */
const fetchReturnPickupRescheduleRequestsFactory =
  (getReturnPickupRescheduleRequests: GetReturnPickupRescheduleRequests) =>
  (returnId: Return['id'], config?: Config) =>
  async (dispatch: Dispatch): Promise<PickupRescheduleRequests> => {
    dispatch({
      type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_REQUEST,
    });

    try {
      const result = await getReturnPickupRescheduleRequests(returnId, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnPickupRescheduleRequestsFactory;
