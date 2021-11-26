import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for creating a replacement for a membership.
 *
 * @function postProgramMembershipReplacement
 * @memberof module:loyalty/client
 *
 * @param {string} programId - Program identifier.
 * @param {string} membershipId - Membership identifier.
 * @param {object} data - Replacement to be created.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (programId, membershipId, data, config) =>
  client
    .post(
      join(
        '/loyalty/v1/programs',
        programId,
        'memberships',
        membershipId,
        'replacements',
      ),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
