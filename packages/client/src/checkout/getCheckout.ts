import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetCheckout } from './types';

/**
 * Method responsible for loading the checkout.
 *
 * @param id     - Universal identifier of the Checkout.
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCheckout: GetCheckout = (id, query, config) =>
  client
    .get(join('/checkout/v1/orders/', id, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCheckout;
