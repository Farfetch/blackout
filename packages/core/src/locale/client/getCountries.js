import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Gets all countries.
 *
 * @function getCountries
 * @memberof module:locale/client
 *
 * @param {object} [query] - Query parameters to apply to the listing.
 * @param {object} [query.pageIndex=1] - The current page.
 * @param {object} [query.pageSize=15] - Size of each page, as a number.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (query, config) =>
  client
    .get(join('/settings/v1/countries', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
