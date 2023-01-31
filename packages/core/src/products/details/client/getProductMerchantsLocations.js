import client, { adaptError } from '../../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for fetching the merchants locations for a specific
 * product variant.
 *
 * @function getProductMerchantsLocations
 * @memberof module:products/client
 *
 * @param {number} productId - Product identifier.
 * @param {string} variantId - Variant identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (productId, variantId, config) =>
  client
    .get(
      join(
        '/commerce/v1/products',
        productId,
        '/variants',
        variantId,
        'merchantsLocations',
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
