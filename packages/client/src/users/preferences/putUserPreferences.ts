import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { Config } from '../../types';
import type { PutUserPreferencesData } from './types';

/**
 * Method responsible for update user preferences.
 *
 * @param userId - User's id to be filtered for.
 * @param data   - User preferences data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const putUserPreferences = (
  userId: number,
  data: PutUserPreferencesData,
  config?: Config,
) =>
  client
    .put(join('/account/v1/users/', userId, '/preferences'), data, config)
    .catch(error => {
      throw adaptError(error);
    });
