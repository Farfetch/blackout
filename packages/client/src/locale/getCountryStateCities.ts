import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetCountryStateCities } from './types';

/**
 * Gets all the country cities by state id.
 *
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2) to find the cities related.
 * @param stateId     - State identifier to find the cities related.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCountryStateCities: GetCountryStateCities = (
  countryCode,
  stateId,
  config,
) =>
  client
    .get(
      join('/settings/v1/countries', countryCode, 'states', stateId, 'cities'),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCountryStateCities;
