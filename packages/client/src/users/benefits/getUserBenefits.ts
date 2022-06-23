import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import type { GetUserBenefits } from './types';

/**
 * Method responsible for getting user benefits.
 *
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getUserBenefits: GetUserBenefits = config =>
  client
    .get('/legacy/v1/userbenefits', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
