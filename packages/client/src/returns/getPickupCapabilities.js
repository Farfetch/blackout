import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetPickupCapabilitiesQuery
 *
 * @alias GetPickupCapabilitiesQuery
 * @memberof module:returns/client
 *
 * @property {Date} [pickupDay] - Timestamp for the day of pickup.
 * @property {string} [guestOrderId] - Order identifier. Only required if
 * the user is not registered (guest).
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * Obtains the pickup capabilities for a specific order.
 *
 * @function getPickupCapabilities
 * @memberof module:returns/client
 *
 * @param {string} id - Return identifier.
 * @param {GetPickupCapabilitiesQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, query, config) =>
  client
    .get(
      join('/legacy/v1/returns', id, 'pickupcapabilities', { query }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
