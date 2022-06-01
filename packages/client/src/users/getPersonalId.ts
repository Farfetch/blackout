import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetPersonalId } from './types';

/**
 * Method responsible for getting a personal id.
 *
 * @param userId     - The user's id.
 * @param personalId - Personal identifier.
 * @param config     - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                     header is required.
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */

const getPersonalId: GetPersonalId = (userId, personalId, config) =>
  client
    .get(join('/account/v1/users', userId, 'personalIds/', personalId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPersonalId;
