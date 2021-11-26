import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { DeletePaymentToken } from './types';

/**
 * Method responsible for deleting a user payment token.
 * This is used for deleting a credit card.
 *
 * @function deletePaymentToken
 * @memberof module:payments/client
 *
 * @param {string} id       - Universal identifier of the token to be deleted.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const deletePaymentToken: DeletePaymentToken = (id, config) =>
  client
    .delete(join('/payment/v1/tokens', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deletePaymentToken;
