import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import type { PostPhoneNumberValidation } from './types';

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
