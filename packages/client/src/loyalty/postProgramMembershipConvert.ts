import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PostProgramMembershipConvert } from './types/index.js';

/**
 * Method responsible for creating a convert for a membership.
 *
 * @param programId    - Program identifier.
 * @param membershipId - Membership identifier.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
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
