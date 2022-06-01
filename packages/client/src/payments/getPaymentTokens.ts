import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetPaymentTokens } from './types';

/**
 * Method responsible for loading payment tokens. This is used for selecting the
 * credit card.
 *
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPaymentTokens: GetPaymentTokens = (query, config) =>
  client
    .get(join('/payment/v1/tokens', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPaymentTokens;
