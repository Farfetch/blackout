import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostAccountLink } from './types/index.js';

/**
 * Method responsible for merging social provider and Farfetch accounts.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postAccountLink: PostAccountLink = (data, config?) =>
  client
    .post('/account/oidc/accountlinking', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postAccountLink;
