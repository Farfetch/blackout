import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for deleting a user payment token.
 * This is used for deleting a credit card.
 *
 * @function deletePaymentToken
 * @memberof module:payments/client
 *
 * @param {string} tokenId - Universal identifier of the token to be deleted.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (tokenId, config) =>
  client.delete(join('/payment/v1/tokens', tokenId), config).catch(error => {
    throw adaptError(error);
  });
