import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PatchGiftMessage } from './types';

/**
 * Method responsible for adding, editing and removing gift
 * messages to the current checkout order.
 *
 * @function patchGiftMessage
 * @memberof module:checkout/client
 *
 * @param {string} id - Universal identifier of the Checkout.
 * @param {Array} data - Array of objects containing the checkout order id and
 * the checkout item patch document reflecting the changes to be made.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const patchGiftMessage: PatchGiftMessage = (id, data, config) =>
  client
    .patch(join('/checkout/v1/orders/', id, 'items'), data, config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default patchGiftMessage;
