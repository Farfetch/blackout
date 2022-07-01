import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { GetUserAttribute } from './types';

/**
 * Method responsible for getting a specific user attribute.
 *
 * @param userId      - The user's id.
 * @param attributeId - The attribute id.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserAttribute: GetUserAttribute = (userId, attributeId, config) =>
  client
    .get(join('/account/v1/users', userId, '/attributes', attributeId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserAttribute;
