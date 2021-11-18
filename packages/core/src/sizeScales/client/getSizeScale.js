import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for loading the size scale that a product belongs to.
 *
 * @function getSizeScale
 * @memberof module:sizeScales/client
 *
 * @param {string} id - Scale Identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, config) =>
  client
    .get(join('/commerce/v1/sizeScales', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
