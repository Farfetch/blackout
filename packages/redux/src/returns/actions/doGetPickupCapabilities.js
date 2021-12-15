import { adaptDate } from '@farfetch/blackout-client/helpers/adapters';
import {
  GET_PICKUP_CAPABILITIES_FAILURE,
  GET_PICKUP_CAPABILITIES_REQUEST,
  GET_PICKUP_CAPABILITIES_SUCCESS,
} from '../actionTypes';
import parsePickupDate from '@farfetch/blackout-client/helpers/parsePickupDate';

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
 * @param {string} id - Return identifier.
 * @param {GetPickupCapabilitiesQuery} [query] - Query parameters for the pickup capabilities.
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
  (id, query, config) =>
  async dispatch => {
    const queryParams = {
      ...query,
      pickupDay: parsePickupDate(query.pickupDay),
    };

    dispatch({
      type: GET_PICKUP_CAPABILITIES_REQUEST,
    });

    try {
      const {
        availableEndHours,
        availableStartHours,
        availableTimeSlots,
        pickupDate,
        result,
      } = await getPickupCapabilities(id, queryParams, config);

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
