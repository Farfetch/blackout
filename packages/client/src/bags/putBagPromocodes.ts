import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PutBagPromocodes } from './types';

/**
 * Method responsible for set list of promocodes in the bag.
 *
 * @param id     - Universal identifier of the bag.
 * @param data   - List of promocodes to set to the bag.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const putBagPromocodes: PutBagPromocodes = (id, data, config) =>
  client
    .put(join('/commerce/v1/bags', id, 'promocodes'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default putBagPromocodes;
