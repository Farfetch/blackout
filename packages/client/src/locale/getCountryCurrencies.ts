import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetCountryCurrencies } from './types';

/**
 * Gets all the country currencies by country code.
 *
 * @function getCountryCurrencies
 * @memberof module:locale
 *
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2) to
 * find the currencies related.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
const getCountryCurrencies: GetCountryCurrencies = (countryCode, config) =>
  client
    .get(join('/settings/v1/countries', countryCode, 'currencies'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCountryCurrencies;
