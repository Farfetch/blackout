import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetMerchantsLocationsQuery
 *
 * @alias GetMerchantsLocationsQuery
 * @memberof module:merchantsLocations/client
 *
 * @property {string} [merchantIds] - Merchant ids to filter the merchants
 * locations.
 * @property {string} [merchantLocationIds] - Merchants location ids to filter
 *  the merchants locations.
 * @property {number} [countryId] - Country id to filter the merchants
 * locations.
 */

/**
 * Method responsible for loading the merchants locations.
 *
 * @function getMerchantsLocations
 * @memberof module:merchantsLocations/client
 *
 * @param {GetMerchantsLocationsQuery} [query] - Query with parameters to get
 *  the merchants locations.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (query, config) =>
  client
    .get(
      join('/commerce/v1/merchantsLocations', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
