import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for fetching the available payment methods.
 *
 * @function getPaymentMethods
 * @memberof module:payments/client
 *
 * @param {string} id - Universal identifier of the order.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, config) =>
  client
    .get(
      join('/checkout/v1/orders', id, {
        query: {
          fields: 'paymentMethods',
        },
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
