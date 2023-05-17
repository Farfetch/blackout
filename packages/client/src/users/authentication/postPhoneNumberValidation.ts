import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostPhoneNumberValidation } from './types/index.js';

/**
 * Method responsible for sending a phone token to the specified phone number.
 *
 * @param data   - Object containing the phone number.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */

const postPhoneNumberValidation: PostPhoneNumberValidation = (data, config?) =>
  client
    .post('/account/v1/users/phoneNumberValidations', data, config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default postPhoneNumberValidation;
