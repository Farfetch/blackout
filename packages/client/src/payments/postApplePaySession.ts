import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PostApplePaySession } from './types/postApplePaySession.types.js';

/**
 * Method responsible for creating an apple pay session.
 *
 * @param data - Request data.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise that will resolve when the call to
 * the endpoint finishes.
 */
const postApplePaySession: PostApplePaySession = (data, config) =>
  client
    .post(join('/payment/v1/applepaysession'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postApplePaySession;
