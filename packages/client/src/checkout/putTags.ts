import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PutTags } from './types';

/**
 * Method responsible for adding tags information.
 *
 * @param id     - Universal identifier of the Checkout.
 * @param data   - Array of strings representing the tags you want to add.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putTags: PutTags = (id, data, config) =>
  client
    .put(join('/checkout/v1/orders/', id, 'tags'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default putTags;