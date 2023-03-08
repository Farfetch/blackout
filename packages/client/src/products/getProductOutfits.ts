import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetProductOutfits } from './types/index.js';

/**
 * Method responsible for getting outfits photographed for the product, usually a single one.
 *
 * @param id     - Product id to search for outfits.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getProductOutfits: GetProductOutfits = (id, config) =>
  client
    .get(join('/commerce/v1/products', id, 'outfits'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductOutfits;
