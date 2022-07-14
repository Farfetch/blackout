import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { GetUserTitles } from './types';

/**
 * Method responsible for get list of titles.
 *
 * @param query  - Query parameters.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getUserTitles: GetUserTitles = (query, config?) =>
  client
    .get(join('/account/v1/titles', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
