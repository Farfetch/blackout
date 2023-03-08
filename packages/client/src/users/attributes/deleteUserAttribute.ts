import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeleteUserAttribute } from './types/index.js';

/**
 * Method responsible for deleting specific user attribute.
 *
 * @param userId      - User's id to be filtered for.
 * @param attributeId - The attribute id to be filtered for.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteUserAttribute: DeleteUserAttribute = (
  userId,
  attributeId,
  config,
) =>
  client
    .delete(
      join('/account/v1/users/', userId, '/attributes', attributeId),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteUserAttribute;
