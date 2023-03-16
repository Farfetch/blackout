import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { GetUserCreditBalance } from './types/index.js';

/**
 * Method responsible for getting the user credit balance.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserCreditBalance: GetUserCreditBalance = (data, config) =>
  client
    .post('/payment/v1/checkCreditBalance', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserCreditBalance;
