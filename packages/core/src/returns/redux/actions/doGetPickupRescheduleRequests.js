import {
  GET_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
  GET_PICKUP_RESCHEDULE_REQUESTS_REQUEST,
  GET_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetPickupRescheduleRequestsThunkFactory
 * @param {string} id - Return identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the pickup reschedule requests.
 *
 * @function doGetPickupRescheduleRequests
 * @memberof module:returns/actions
 *
 * @param {Function} getPickupRescheduleRequests - Get pickup reschedule requests client.
 *
 * @returns {GetPickupRescheduleRequestsThunkFactory} Thunk factory.
 */
export default getPickupRescheduleRequests => (id, config) => async dispatch => {
  dispatch({
    type: GET_PICKUP_RESCHEDULE_REQUESTS_REQUEST,
  });

  try {
    await getPickupRescheduleRequests(id, config);

    dispatch({
      type: GET_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
    });

    throw error;
  }
};
