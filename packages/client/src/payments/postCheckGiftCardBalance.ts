import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import type { PostCheckGiftCardBalance } from './types';

/**
 * Method responsible for getting the gift card balance.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postCheckGiftCardBalance: PostCheckGiftCardBalance = (data, config) =>
  client
    .post('/payment/v1/checkGiftCardBalance', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postCheckGiftCardBalance;
