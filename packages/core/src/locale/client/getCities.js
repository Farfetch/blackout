import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Gets all the cities by state id.
 *
 * @function getCities
 * @memberof module:locale/client
 *
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2) to
 * find the cities related.
 * @param {number} stateId - State identifier to find the cities related.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (countryCode, stateId, config) =>
  client
    .get(
      join('/settings/v1/countries', countryCode, 'states', stateId, 'cities'),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
