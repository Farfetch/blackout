import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetCountries } from './types';

/**
 * Gets all countries.
 *
 * @param query  - Query parameters to apply to the listing.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCountries: GetCountries = (query, config) =>
  client
    .get(join('/settings/v1/countries', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCountries;
