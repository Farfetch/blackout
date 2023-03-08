import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostLogout } from './types/index.js';

/**
 * Method responsible for logging out a user.
 *
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postLogout: PostLogout = (config?) =>
  client.post('/legacy/v1/account/logout', {}, config).catch(error => {
    throw adaptError(error);
  });

export default postLogout;
