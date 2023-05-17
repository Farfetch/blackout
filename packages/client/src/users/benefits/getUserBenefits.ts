import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetUserBenefits } from './types/index.js';

/**
 * Method responsible for getting user benefits.
 *
 * @param userId - User identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserBenefits: GetUserBenefits = (userId, config) =>
  client
    .get(join('/account/v1/users', userId, 'benefits'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserBenefits;
