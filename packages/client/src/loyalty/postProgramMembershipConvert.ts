import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostProgramMembershipConvert } from './types';

/**
 * Method responsible for creating a convert for a membership.
 *
 * @function postProgramMembershipConvert
 * @memberof module:loyalty/client
 *
 * @param {string} programId - Program identifier.
 * @param {string} membershipId - Membership identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const postProgramMembershipConvert: PostProgramMembershipConvert = (
  programId,
  membershipId,
  config,
) =>
  client
    .post(
      join(
        '/loyalty/v1/programs',
        programId,
        'memberships',
        membershipId,
        'converts',
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postProgramMembershipConvert;
