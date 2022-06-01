import client, { adaptError } from '../helpers/client';
import type { PostPhoneTokenValidations } from './types';

/**
 * Method responsible for validates a phone number without an account.
 *
 * @param data   - Object containing the phone number and token.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */

const postPhoneTokenValidations: PostPhoneTokenValidations = (data, config?) =>
  client
    .post('/account/v1/users/phoneTokenValidations', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postPhoneTokenValidations;
