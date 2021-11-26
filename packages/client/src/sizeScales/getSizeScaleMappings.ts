import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetSizeScaleMappings } from './types';

/**
 * @typedef {object} GetSizeScaleMappingsQuery
 *
 * @alias GetSizeScaleMappingsQuery
 * @memberof module:sizeScales/client
 *
 * @property {number} [gender] - Filter size scales mappings for a gender:
 * 0 = Woman, 1 = Man, 2 = Unisex, 3 = Kid.
 * @property {number} [brand] - Filter size scales mappings for a given brand,
 * specified by its numeric identifier. If Brand has value, the API ignores the
 * category value.
 * @property {number} sizeScale - Filter size scales mappings for a specific
 * size scale, specified by its numeric identifier.
 * @property {number} [category] - For a given category, will filter size scale
 * mapping for the primary brand associated with it on these type settings. If
 * no settings are configured, will fallback to return only size scales without
 * brand association. If brand value is null this category value is use to find
 * a brand associated.
 */

/**
 * Method responsible for fetching size scale mappings.
 *
 * @memberof module:sizeScales/client
 *
 * @param {GetSizeScaleMappingsQuery} query - Query with parameters to
 * apply to the request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getSizeScaleMappings: GetSizeScaleMappings = (query, config) =>
  client
    .get(
      join('/commerce/v1/sizeScaleMappings', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSizeScaleMappings;
