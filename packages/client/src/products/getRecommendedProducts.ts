import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetRecommendedProducts } from './types';

/**
 * Method responsible for retrieving data from recommendations endpoint on MKT API.
 *
 * @param query  - Query object with product recommendation parameters to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise object.
 */

const getRecommendedProducts: GetRecommendedProducts = (query, config) => {
  return client
    .get(join('/marketing/v1/recommendations/products', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getRecommendedProducts;
