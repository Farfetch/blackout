import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetPaymentTokens } from './types';

/**
 * @typedef {object} GetPaymentTokensQuery
 *
 * @alias GetPaymentTokensQuery
 * @memberof module:payments/client
 *
 * @property {string} [orderId] - Universal identifier of the order.
 * @property {boolean} [showExpiredCards] - Indicates if the result should
 * have expired cards.
 */

/**
 * Method responsible for loading payment tokens.
 * This is used for selecting the credit card.
 *
 * @function getPaymentTokens
 * @memberof module:payments/client
 *
 * @param {GetPaymentTokensQuery} query - Query params.
 * @param {object} [config]             - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getPaymentTokens: GetPaymentTokens = (query, config) =>
  client
    .get(join('/payment/v1/tokens', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPaymentTokens;
