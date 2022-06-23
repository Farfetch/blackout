import client, { adaptError } from '../helpers/client';
import type { GetBenefits } from './types';

/**
 * Method responsible for getting user benefits.
 *
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getBenefits: GetBenefits = config =>
  client
    .get('/legacy/v1/userbenefits', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getBenefits;
