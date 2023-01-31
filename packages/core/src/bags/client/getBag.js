import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for retrieving data from the bag.
 *
 * @function getBag
 * @memberof module:bags/client
 *
 * @param {string} id - Universal identifier of the bag.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, config) =>
  client
    .get(
      join('/commerce/v1/bags', id, {
        query: { hydrate: true },
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
