import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { PatchUserPersonalId } from './types/index.js';

/**
 * Method responsible for updating specific personal id.
 *
 * @param userId     - User identifier.
 * @param personalId - Personal identifier.
 * @param data       - Personal id data.
 * @param config     - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                     header is required.
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchUserPersonalId: PatchUserPersonalId = (
  userId,
  personalId,
  data,
  config,
) =>
  client
    .patch(
      join('/account/v1/users', userId, 'personalIds/', personalId),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default patchUserPersonalId;
