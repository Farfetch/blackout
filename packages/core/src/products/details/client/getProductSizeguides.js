import client, { adaptError } from '../../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for loading the sizeguides for a specific product id.
 * This sizeguides logic should be used where the project has a category tree.
 * If your project does not have a category tree you should use the sizeguides
 * logic from @farfetch/blackout-core/sizeguides/client.
 *
 * @function getProductSizeguides
 * @memberof module:products/client
 *
 * @param {number} id - Product id to search for sizeguides.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, config) =>
  client
    .get(join('/commerce/v1/products', id, 'sizeguides'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
