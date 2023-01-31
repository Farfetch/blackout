import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetSettingsQuery
 *
 * @alias GetSettingsQuery
 * @memberof module:account/settings/client
 *
 * @property {string} channelCode - Channel code.
 * @property {string} type - Possible value: Castle, Generic,
 * AddressPredictionProvider, FarfetchLogin.
 *
 */

/**
 * Gets the settings for the specified type.
 *
 * @function getSettings
 * @memberof module:account/settings/client
 *
 * @param {GetSettingsQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (query, config) =>
  client
    .get(
      join('/account/v1/settings', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
