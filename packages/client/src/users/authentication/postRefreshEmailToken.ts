import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import type { PostRefreshEmailToken } from './types';

/**
 * Refreshes the user's validation email token. To be used when the user went past
 * the email token's expiration date or there was other kind of error validation
 * the user's email.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postRefreshEmailToken: PostRefreshEmailToken = (data, config?) =>
  client.post('/account/v1/emailtokens', data, config).catch(error => {
    throw adaptError(error);
  });

export default postRefreshEmailToken;
