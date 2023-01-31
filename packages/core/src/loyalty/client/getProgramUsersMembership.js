import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for loading the user membership.
 *
 * @function getProgramUsersMembership
 * @memberof module:loyalty/client
 *
 * @param {string} programId - Program identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (programId, config) =>
  client
    .get(join('/loyalty/v1/programs', programId, 'users/membership'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
