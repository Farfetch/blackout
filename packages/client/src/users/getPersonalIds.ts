import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetPersonalIds } from './types';

/**
 * Method responsible for getting the personal ids.
 *
 * @param userId - Universal identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                 header is required.
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getPersonalIds: GetPersonalIds = (userId, config) =>
  client
    .get(join('/account/v1/users/', userId, '/personalIds'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPersonalIds;
