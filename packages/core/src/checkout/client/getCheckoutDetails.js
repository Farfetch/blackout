import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for loading the checkout details.
 * These are used for the order confirmation.
 *
 * @function getCheckoutDetails
 * @memberof module:checkout/client
 *
 * @param {string} id - Universal identifier of the Checkout.
 * @param {object} [query] - Query params.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, query, config) =>
  client
    .get(join('/checkout/v1/orders/', id, 'details', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
