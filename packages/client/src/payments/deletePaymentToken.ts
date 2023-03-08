import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeletePaymentToken } from './types/index.js';

/**
 * Method responsible for deleting a user payment token. This is used for deleting
 * a credit card.
 *
 * @param paymentTokenId - Universal identifier of the token to be deleted.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deletePaymentToken: DeletePaymentToken = (paymentTokenId, config) =>
  client
    .delete(join('/payment/v1/tokens', paymentTokenId), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deletePaymentToken;
