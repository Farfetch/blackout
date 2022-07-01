import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import type { Config } from '../../types';
import type { GetUser } from './types/getUser.types';

/**
 * Method responsible for fetching the logged user data.
 *
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUser: GetUser = (config?: Config) =>
  client
    .get('/account/v1/users/me', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUser;
