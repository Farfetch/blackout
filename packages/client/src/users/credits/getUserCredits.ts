import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { GetUserCredits } from './types';
/**
 * Method responsible to get the credit balance of the user.
 *
 * @param userId - User identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserCredits: GetUserCredits = (userId, config?) =>
  client
    .get(join('/account/v1/users', userId, 'credits'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserCredits;
