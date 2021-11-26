import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PutPromocode } from './types';

/**
 * @typedef {object} PutPromocodeData
 *
 * @alias PutPromocodeData
 * @memberof module:checkout/client
 *
 * @property {string} promocode - Promocode.
 */

/**
 * Method responsible for adding promo code information.
 *
 * @function putPromocode
 * @memberof module:checkout/client
 *
 * @param {string} id - Universal identifier of the Checkout.
 * @param {PutPromocodeData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const putPromocode: PutPromocode = (id, data, config) =>
  client
    .put(join('/checkout/v1/orders/', id, 'promocodes'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default putPromocode;
