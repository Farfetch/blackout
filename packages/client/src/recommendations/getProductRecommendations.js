import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for retrieving data from recommendations endpoint on
 * MKT API.
 *
 * @function getProductRecommendations
 * @memberof module:recommendations
 * @param {number} productId - Product identifier.
 * @param {string} strategyName - Recommendation algorithm to be used.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise object.
 */
export default (productId, strategyName, config) =>
  client
    .get(
      join('/marketing/v1/recommendations/products', {
        query: { strategyName, productId },
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
