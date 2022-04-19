import {
  POST_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
  POST_PICKUP_RESCHEDULE_REQUESTS_REQUEST,
  POST_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} TimeWindow
 *
 * @property {string} start - Start date of the pickup reschedule request.
 * @property {string} end - End date of the pickup reschedule request.
 */

/**
 * @typedef {object} Data
 *
 * @property {string} id - Identifier.
 * @property {TimeWindow} timeWindow - Time window of the pickup reschedule request.
 * @property {string} status - Status of the request.
 */

/**
 * @callback PostPickupRescheduleRequestsThunkFactory
 * @param {string} id - Return identifier.
 * @param {Data} data - Reschedule request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating a pickup reschedule request.
 *
 * @function doPostPickupRescheduleRequests
 * @memberof module:returns/actions
 *
 * @param {Function} postPickupRescheduleRequests  - Post pickup reschedule requests client.
 *
 * @returns {PostPickupRescheduleRequestsThunkFactory} Thunk factory.
 */
export default postPickupRescheduleRequests =>
  (id, data, config) =>
  async dispatch => {
    dispatch({
      type: POST_PICKUP_RESCHEDULE_REQUESTS_REQUEST,
    });

    try {
      await postPickupRescheduleRequests(id, data, config);

      dispatch({
        type: POST_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: POST_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
      });

      throw error;
    }
  };
