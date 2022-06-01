import client, { adaptError } from '../helpers/client';
import type { PostPhoneTokens } from './types';

/**
 * Method responsible for sending a phone token to the specified phone number.
 *
 * @param data   - Object containing the phone number.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */

const postPhoneTokens: PostPhoneTokens = (data, config?) =>
  client
    .post('/account/v1/users/phoneTokens', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postPhoneTokens;
