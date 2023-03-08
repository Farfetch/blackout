import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { PutUserAttribute } from './types/index.js';

/**
 * Method responsible for updating specific user attribute.
 *
 * @param userId      - User's id to be filtered for.
 * @param attributeId - The attribute id to be filtered for.
 * @param data        - User attributes object.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putUserAttribute: PutUserAttribute = (
  userId,
  attributeId,
  data,
  config,
) =>
  client
    .put(
      join('/account/v1/users/', userId, '/attributes', attributeId),
      data,
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default putUserAttribute;
