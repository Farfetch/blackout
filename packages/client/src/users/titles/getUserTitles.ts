import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetUserTitles } from './types/index.js';

/**
 * Method responsible for get list of titles.
 *
 * @param query  - Query parameters.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserTitles: GetUserTitles = (query, config?) =>
  client
    .get(join('/account/v1/titles', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserTitles;
