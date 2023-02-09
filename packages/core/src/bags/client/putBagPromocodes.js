import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} PutBagPromocodesData
 *
 * @alias PutBagPromocodesData
 * @memberof module:bags/client
 *
 * @property {Array<string>} promocodes - Promocodes.
 */

/**
 * Method responsible for adding promo codes information to the user bag.
 *
 * @function putPromocodes
 * @memberof module:bags/client
 *
 * @param {string} id - Universal identifier of the bag.
 * @param {PutBagPromocodesData} data - Request data.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, data, config) =>
  client
    .put(join('/commerce/v1/bags', id, 'promocodes'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
