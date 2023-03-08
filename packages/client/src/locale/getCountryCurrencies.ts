import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetCountryCurrencies } from './types/index.js';

/**
 * Gets all the country currencies by country code.
 *
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2) to find the currencies related.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCountryCurrencies: GetCountryCurrencies = (countryCode, config) =>
  client
    .get(join('/settings/v1/countries', countryCode, 'currencies'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCountryCurrencies;
