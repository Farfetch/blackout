import client, { adaptError } from '../../helpers/client';

/**
 * Method responsible for getting all the categories.
 *
 * @function getCategories
 * @memberof module:categories/client
 *
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default config =>
  client
    .get('/commerce/v1/categories', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
