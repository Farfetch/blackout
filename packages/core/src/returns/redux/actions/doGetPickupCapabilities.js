import { adaptDate } from '../../../helpers/adapters';
import {
  GET_PICKUP_CAPABILITIES_FAILURE,
  GET_PICKUP_CAPABILITIES_REQUEST,
  GET_PICKUP_CAPABILITIES_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} GetPickupCapabilitiesQuery
 * @property {Date} pickupDay - Timestamp for the day of pickup.
 * @property {string} [guestOrderId] - Order identifier. Only required if
 * the user is not registered (guest).
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * @callback GetPickupCapabilitiesThunkFactory
 * @param {number} id - Return identifier.
 * @param {string|number} pickupDay - Day of the pickup. Format: YYYY-MM-DD.
 * @param {GetPickupCapabilitiesQuery} [query] - Query object for the request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the pickup capabilities for a specific order.
 *
 * @function doGetPickupCapabilities
 * @memberof module:returns/actions
 *
 * @param {Function} getPickupCapabilities - Get pickup capabilities client.
 *
 * @returns {GetPickupCapabilitiesThunkFactory} Thunk factory.
 */
export default getPickupCapabilities =>
  (id, pickupDay, query = {}, config) =>
  async dispatch => {
    dispatch({
      type: GET_PICKUP_CAPABILITIES_REQUEST,
    });

    try {
      const result = await getPickupCapabilities(id, pickupDay, query, config);

      const {
        availableEndHours,
        availableStartHours,
        availableTimeSlots,
        pickupDate,
      } = result;

      dispatch({
        meta: { id },
        payload: {
          entities: {
            availableEndHours:
              availableEndHours && availableEndHours.map(adaptDate),
            availableStartHours:
              availableStartHours && availableStartHours.map(adaptDate),
            availableTimeSlots:
              availableTimeSlots &&
              availableTimeSlots.map(timeSlot => ({
                start: adaptDate(timeSlot.start),
                end: adaptDate(timeSlot.end),
              })),
            pickupDate: pickupDate && adaptDate(pickupDate),
          },
        },
        type: GET_PICKUP_CAPABILITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_PICKUP_CAPABILITIES_FAILURE,
      });

      throw error;
    }
  };
