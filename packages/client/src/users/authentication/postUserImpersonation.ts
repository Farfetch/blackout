import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import type { PostUserImpersonation } from './types';

/**
 * Creates user impersonation.
 *
 * @param data   - The impersonate data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postUserImpersonation: PostUserImpersonation = (data, config?) =>
  client
    .post('/authentication/v1/userImpersonations', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postUserImpersonation;
