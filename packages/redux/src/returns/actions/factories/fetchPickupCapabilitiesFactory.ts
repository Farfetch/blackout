import { adaptDate } from '@farfetch/blackout-client/helpers/adapters';
import {
  FETCH_PICKUP_CAPABILITIES_FAILURE,
  FETCH_PICKUP_CAPABILITIES_REQUEST,
  FETCH_PICKUP_CAPABILITIES_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';
import type {
  GetPickupCapabilities,
  PickupCapabilities,
} from '@farfetch/blackout-client/src/returns/types';

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
 * @function fetchPickupCapabilitiesFactory
 * @memberof module:returns/actions
 *
 * @param {Function} getPickupCapabilities - Get pickup capabilities client.
 *
 * @returns {GetPickupCapabilitiesThunkFactory} Thunk factory.
 */
const fetchPickupCapabilitiesFactory =
  (getPickupCapabilities: GetPickupCapabilities) =>
  (id: number, pickupDay: string, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<PickupCapabilities> => {
    dispatch({
      type: FETCH_PICKUP_CAPABILITIES_REQUEST,
    });

    try {
      const result = await getPickupCapabilities(id, pickupDay, config);
      const { availableTimeSlots } = result;

      dispatch({
        payload: {
          entities: {
            availableTimeSlots: availableTimeSlots.map(timeSlot => ({
              start: adaptDate(timeSlot.start),
              end: adaptDate(timeSlot.end),
            })),
          },
        },
        type: FETCH_PICKUP_CAPABILITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PICKUP_CAPABILITIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchPickupCapabilitiesFactory;
