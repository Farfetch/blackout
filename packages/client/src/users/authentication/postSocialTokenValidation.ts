import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostSocialTokenValidation } from './types/index.js';

/**
 * Method responsible for checking token validity for FPS layer consumption.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postSocialTokenValidation: PostSocialTokenValidation = (data, config?) =>
  client
    .post('/authentication/v1/connect/introspect', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postSocialTokenValidation;
