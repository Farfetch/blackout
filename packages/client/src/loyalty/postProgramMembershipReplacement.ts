import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PostProgramMembershipReplacement } from './types';

/**
 * Method responsible for creating a replacement for a membership.
 *
 * @param programId    - Program identifier.
 * @param membershipId - Membership identifier.
 * @param data         - Replacement to be created.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postProgramMembershipReplacement: PostProgramMembershipReplacement = (
  programId,
  membershipId,
  data,
  config,
) =>
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

export default postProgramMembershipReplacement;
