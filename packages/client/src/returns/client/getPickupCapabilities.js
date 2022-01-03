import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Obtains the pickup capabilities for a specific order.
 *
 * @function getPickupCapabilities
 * @memberof module:returns/client
 *
 * @param {number} id - Return identifier.
 * @param {string} pickupDay - Timestamp for the day of pickup.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, pickupDay, config) =>
  client
    .get(
      join('/account/v1/returns/', id, 'pickupcapabilities/', pickupDay),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
