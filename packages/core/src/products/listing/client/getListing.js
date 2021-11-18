import client, { adaptError } from '../../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for loading the listing.
 *
 * @function getListing
 * @memberof module:products/client
 *
 * @param {string} slug - Slug to load the products.
 * @param {object} [query] - Query parameters to apply to the listing.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (slug, query, config) =>
  client
    .get(join('/commerce/v1/', slug, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
