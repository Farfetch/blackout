import {
  GET_PICKUP_RESCHEDULE_REQUEST_FAILURE,
  GET_PICKUP_RESCHEDULE_REQUEST_REQUEST,
  GET_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetPickupRescheduleRequestThunkFactory
 * @param {string} id - Return identifier.
 * @param {string} pickupRescheduleId - Pickup reschedule request identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains a specific pickup reschedule request.
 *
 * @function doGetPickupRescheduleRequest
 * @memberof module:returns/actions
 *
 * @param {Function} getPickupRescheduleRequest - Get pickup reschedule request client.
 *
 * @returns {GetPickupRescheduleRequestThunkFactory} Thunk factory.
 */
export default getPickupRescheduleRequest =>
  (id, pickupRescheduleId, config) =>
  async dispatch => {
    dispatch({
      type: GET_PICKUP_RESCHEDULE_REQUEST_REQUEST,
    });

    try {
      await getPickupRescheduleRequest(id, pickupRescheduleId, config);

      dispatch({
        type: GET_PICKUP_RESCHEDULE_REQUEST_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_PICKUP_RESCHEDULE_REQUEST_FAILURE,
      });

      throw error;
    }
  };
