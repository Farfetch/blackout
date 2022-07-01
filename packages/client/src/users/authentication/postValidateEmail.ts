import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import type { PostValidateEmail } from './types';

/**
 * Method responsible for validating the user's e-mail, activating the account.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postValidateEmail: PostValidateEmail = (data, config?) =>
  client
    .post('/account/v1/emailtokensvalidation', data, config)
    .catch(error => {
      throw adaptError(error);
    });

export default postValidateEmail;
