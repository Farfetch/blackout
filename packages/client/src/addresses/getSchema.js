import client, { adaptError } from '../helpers/client';

/**
 * Obtains the address schema for a country specified with 'id'.
 *
 * @function getSchema
 * @memberof module:addresses/client
 *
 * @param {string|number} isoCode - IsoCode (preferably).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise<string|object>} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (isoCode, config) =>
  client
    .get(`/account/v1/countries/${isoCode}/addressSchemas`, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
