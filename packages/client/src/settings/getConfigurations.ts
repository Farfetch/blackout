import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetConfigurations } from './types/index.js';

/**
 * Method responsible for fetching all the configurations for the giving criteria.
 *
 * @param query  - Query with parameters to fetch configurations.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getConfigurations: GetConfigurations = (query, config) =>
  client
    .get(
      join('/settings/v1/configurations', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getConfigurations;
