import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { GetUserDefaultPersonalId } from './types';

/**
 * Method responsible for getting the default personal ids.
 *
 * @param userId - Universal identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                 header is required.
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserDefaultPersonalId: GetUserDefaultPersonalId = (userId, config) =>
  client
    .get(join('/account/v1/users/', userId, '/personalids/default'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserDefaultPersonalId;
