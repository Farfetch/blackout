import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductVariantsByMerchantsLocations } from './types';

/**
 * Method responsible for fetching the merchants locations for a specific
 * product variant.
 *
 * @memberof module:products/client
 *
 * @param {number} id - Product identifier.
 * @param {string} variantId - Variant identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getProductVariantsByMerchantsLocations: GetProductVariantsByMerchantsLocations =
  (id, variantId, config) =>
    client
      .get(
        join(
          '/commerce/v1/products',
          id,
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

export default getProductVariantsByMerchantsLocations;
