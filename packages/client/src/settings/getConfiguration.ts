import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetConfiguration } from './types/index.js';

/**
 * Method responsible for getting a configuration by its code.
 *
 * @param code - Code that identifies the configuration.
 * @param query  - Query with parameters to fetch a configuration.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getConfiguration: GetConfiguration = (code, query, config) =>
  client
    .get(
      join('/settings/v1/configurations', code, {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getConfiguration;
