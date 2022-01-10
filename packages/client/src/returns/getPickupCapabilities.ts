import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetPickupCapabilities } from './types';

/**
 * Obtains the pickup capabilities for a specific order.
 *
 * @function getPickupCapabilities
 * @memberof module:returns/client
 *
 * @param {string} id - Return identifier.
 * @param {string} pickupDay - Day of the pickup. Format YYYY-MM-DD.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getPickupCapabilities: GetPickupCapabilities = (id, pickupDay, config) =>
  client
    .get(
      join('/account/v1/returns/', id, 'pickupcapabilities/', pickupDay),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPickupCapabilities;
