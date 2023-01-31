import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';
import parsePickupDate from '../../helpers/parsePickupDate';

/**
 * @typedef {object} GetPickupCapabilitiesQuery
 *
 * @alias GetPickupCapabilitiesQuery
 * @memberof module:returns/client
 *
 * @property {Date} pickupDay - Timestamp for the day of pickup.
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
 * @param {number} id - Return identifier.
 * @param {string|number} pickupDay - Day of the pickup. Format: YYYY-MM-DD or a Timestamp.
 * @param {GetPickupCapabilitiesQuery} [query] - Query object for the request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, pickupDay, query, config) => {
  const queryParams = {
    ...query,
    pickupDay: parsePickupDate(query?.pickupDay ? query.pickupDay : pickupDay),
  };
  const isQuery =
    typeof pickupDay !== 'string' || typeof query?.pickupDay === 'number';

  const args = isQuery
    ? [
        join('/legacy/v1/returns', id, 'pickupcapabilities', {
          query: { pickupDay: queryParams.pickupDay },
        }),
        config,
      ]
    : [
        join('/account/v1/returns', id, 'pickupcapabilities', pickupDay),
        config,
      ];

  return client
    .get(...args)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
