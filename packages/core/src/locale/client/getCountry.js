import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Gets the country information by its country code.
 *
 * @function getCountry
 * @memberof module:locale/client
 *
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2) to
 * find country related.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (countryCode, config) =>
  client
    .get(join('/settings/v1/countries', countryCode), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
