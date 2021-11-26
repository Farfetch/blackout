import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetSizeScales } from './types';

/**
 * @typedef {object} GetSizeScalesQuery
 *
 * @alias GetSizeScalesQuery
 * @memberof module:sizeScales/client
 *
 * @property {number} [categoryId] - Category id to search for size scale.
 */

/**
 * Method responsible for fetching size scales.
 *
 * @memberof module:sizeScales/client
 *
 * @param {GetSizeScalesQuery} [query] - Query with parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getSizeScales: GetSizeScales = (query, config) =>
  client
    .get(
      join('/commerce/v1/sizeScales', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSizeScales;
