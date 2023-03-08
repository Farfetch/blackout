import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostReturnPickupRescheduleRequest,
  type PostReturnPickupRescheduleRequestData,
  type Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating a pickup reschedule request.
 *
 * @param postReturnPickupRescheduleRequest - Post pickup reschedule request client.
 *
 * @returns Thunk factory.
 */
const createReturnPickupRescheduleRequestFactory =
  (postReturnPickupRescheduleRequest: PostReturnPickupRescheduleRequest) =>
  (
    id: Return['id'],
    data: PostReturnPickupRescheduleRequestData,
    config?: Config,
  ) =>
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_RETURN_PICKUP_RESCHEDULE_REQUEST_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createReturnPickupRescheduleRequestFactory;
