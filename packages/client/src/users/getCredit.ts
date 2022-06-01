import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { Config } from '../types';

/**
 * Method responsible to get the credit balance of the user.
 *
 * @param id     - User identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCredit = (id: string, config?: Config) =>
  client
    .get(join('/legacy/v1/users', id, 'credits'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCredit;
