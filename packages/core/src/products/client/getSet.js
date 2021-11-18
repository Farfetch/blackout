import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for getting a set data.
 *
 * @function getSet
 * @memberof module:products/client
 *
 * @param {string|number} pathname - Set identifier (ID, slug or gender/slug).
 * @param {object} [query] - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (pathname, query, config) =>
  client
    .get(join('/commerce/v1/sets', pathname, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
