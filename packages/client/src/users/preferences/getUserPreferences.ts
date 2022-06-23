import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { GetUserPreferences } from './types';

/**
 * Method responsible for getting user preferences.
 *
 * @param userId - User's id to.
 * @param code   - Preference code to be filtered.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getUserPreferences: GetUserPreferences = (
  userId,
  code?,
  config?,
) =>
  client
    .get(
      join('/account/v1/users/', userId, '/preferences', {
        query: {
          code,
        },
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
