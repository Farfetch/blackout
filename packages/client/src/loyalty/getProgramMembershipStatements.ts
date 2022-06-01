import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProgramMembershipStatements } from './types';

/**
 * Method responsible for loading the statements for a membership.
 *
 * @param programId    - Program identifier.
 * @param membershipId - Membership identifier.
 * @param query        - Query params.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getProgramMembershipStatements: GetProgramMembershipStatements = (
  programId,
  membershipId,
  query,
  config,
) =>
  client
    .get(
      join(
        '/loyalty/v1/programs',
        programId,
        'memberships',
        membershipId,
        'statements',
        {
          query,
        },
      ),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProgramMembershipStatements;
