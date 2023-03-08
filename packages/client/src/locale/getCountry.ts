import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCountry } from './types/index.js';

/**
 * Gets the country information by its country code.
 *
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2) to find country related.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCountry: GetCountry = (countryCode, config) =>
  client
    .get(join('/settings/v1/countries', countryCode), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCountry;
