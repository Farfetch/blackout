import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProductRecommendations } from './types';

/**
 * Method responsible for retrieving data from recommendations endpoint on
 * MKT API.
 *
 * @param query - Query object with product recommendation parameters to apply.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise object.
 */

const getProductRecommendations: GetProductRecommendations = (
  query,
  config,
) => {
  return client
    .get(join('/marketing/v1/recommendations/products', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getProductRecommendations;
