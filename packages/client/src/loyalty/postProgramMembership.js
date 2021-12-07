import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for creating a membership for a program.
 *
 * @function postProgramMembership
 * @memberof module:loyalty/client
 *
 * @param {string} programId - Program identifier.
 * @param {object} data - Membership to be created.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (programId, data, config) =>
  client
    .post(join('/loyalty/v1/programs', programId, 'memberships'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
