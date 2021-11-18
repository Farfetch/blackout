import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Gets the settings for the given id.
 *
 * @function getSetting
 * @memberof module:account/settings/client
 *
 * @param {string} settingId - Setting identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (settingId, config) =>
  client
    .get(join('/account/v1/settings', settingId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
