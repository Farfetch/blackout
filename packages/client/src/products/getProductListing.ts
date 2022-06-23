import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductListing } from './types';

/**
 * Method responsible for loading the listing.
 *
 * @param slug   - Slug to load the products.
 * @param query  - Query parameters to apply to the listing.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getProductListing: GetProductListing = (slug, query, config) =>
  client
    .get(join('/commerce/v1/listing', slug, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductListing;
