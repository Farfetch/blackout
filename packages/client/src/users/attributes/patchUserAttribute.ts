import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { PatchUserAttribute } from './types';

/**
 * Method responsible for updating specific user attribute.
 *
 * @param userId      - User's id to be filtered for.
 * @param attributeId - The attribute id to be filtered for.
 * @param data        - User attribute data.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchUserAttribute: PatchUserAttribute = (
  userId,
  attributeId,
  data,
  config,
) =>
  client
    .patch(
      join('/account/v1/users/', userId, '/attributes', attributeId),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default patchUserAttribute;
