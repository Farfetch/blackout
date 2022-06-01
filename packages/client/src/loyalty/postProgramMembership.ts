import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostProgramMembership } from './types';

/**
 * Method responsible for creating a membership for a program.
 *
 * @param programId - Program identifier.
 * @param data      - Membership to be created.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postProgramMembership: PostProgramMembership = (
  programId,
  data,
  config,
) =>
  client
    .post(join('/loyalty/v1/programs', programId, 'memberships'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postProgramMembership;
