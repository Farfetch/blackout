import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetCollectPointsQuery
 *
 * @alias GetCollectPointsQuery
 * @memberof module:checkout/client
 *
 * @property {number} [orderId] - Universal identifier of the Order.
 */

/**
 * Method responsible for loading the collect points.
 *
 * @function getCollectPoints
 * @memberof module:checkout/client
 *
 * @param {GetCollectPointsQuery} [query] - Query params.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (query, config) =>
  client
    .get(join('/checkout/v1/collectpoints', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
