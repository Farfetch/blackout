import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetAccountSettings } from './types/index.js';

/**
 * Method responsible for fetching all the settings for the giving criteria.
 *
 * @param query  - Query with parameters to fetch settings.
 * @param config - Custom settings to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getAccountSettings: GetAccountSettings = (query, config) =>
  client
    .get(
      join('/account/v1/settings', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getAccountSettings;
