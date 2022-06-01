import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetProgramUsersMembership } from './types';

/**
 * Method responsible for loading the user membership.
 *
 * @param programId - Program identifier.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getProgramUsersMembership: GetProgramUsersMembership = (
  programId,
  config,
) =>
  client
    .get(join('/loyalty/v1/programs', programId, 'users/membership'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProgramUsersMembership;
