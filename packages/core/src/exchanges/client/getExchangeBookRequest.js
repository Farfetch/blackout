import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for obtaining an exchange book request by its id.
 *
 * @function getExchangeBookRequest
 * @memberof module:exchanges/client
 *
 * @param {string} id - The uuid of the exchange.
 * @param {string} bookRequestId - The uuid of the booking request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, bookRequestId, config) =>
  client
    .get(
      join('/account/v1/exchanges', id, '/bookRequests', bookRequestId),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
