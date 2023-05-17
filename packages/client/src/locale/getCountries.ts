import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCountries } from './types/index.js';

/**
 * Gets all countries.
 *
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCountries: GetCountries = config =>
  client
    // Right now the endpoint returns a paginated response so we need to set a big pageSize
    // so that all countries are returned. When the endpoint is changed, remove this query parameter.
    .get(join('/settings/v1/countries', { query: { pageSize: 10000 } }), config)
    .then(response => response.data?.entries)
    .catch(error => {
      throw adaptError(error);
    });

export default getCountries;
