import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetUserClosets } from './types/index.js';

/**
 * Method responsible for getting user closets.
 *
 * @param userId - Universal identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserClosets: GetUserClosets = (userId, config) =>
  client
    .get(join('/account/v1/users/', userId, '/closets'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserClosets;
