import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { Config } from '../../types/index.js';
import type { GetUserLegacy } from './types/getUserLegacy.types.js';

/**
 * Legacy method responsible for fetching the logged user data.
 *
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUser: GetUserLegacy = (config?: Config) =>
  client
    .get('/legacy/v1/users/me', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUser;
