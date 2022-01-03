import { adaptDate } from '../../../helpers/adapters';
import {
  GET_PICKUP_CAPABILITIES_FAILURE,
  GET_PICKUP_CAPABILITIES_REQUEST,
  GET_PICKUP_CAPABILITIES_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetPickupCapabilitiesThunkFactory
 * @param {number} id - Return identifier.
 * @param {string} pickupDay - Timestamp for the day of pickup.
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
  (id, pickupDay, config) =>
  async dispatch => {
    dispatch({
      type: GET_PICKUP_CAPABILITIES_REQUEST,
    });

    try {
      const {
        availableEndHours,
        availableStartHours,
        availableTimeSlots,
        pickupDate,
      } = await getPickupCapabilities(id, pickupDay, config);

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
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_PICKUP_CAPABILITIES_FAILURE,
      });

      throw error;
    }
  };
