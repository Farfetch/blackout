import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { PutUserPreferences } from './types/index.js';

/**
 * Method responsible for update user preferences.
 *
 * @param userId - User's id to be filtered for.
 * @param data   - User preferences data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putUserPreferences: PutUserPreferences = (userId, data, config) =>
  client
    .put(join('/account/v1/users/', userId, '/preferences'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default putUserPreferences;
