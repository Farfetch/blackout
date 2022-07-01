import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { PostUserAttribute } from './types';

/**
 * Method responsible for creating new user attributes.
 *
 * @param userId - User's id to set the attributes.
 * @param data   - User attributes object.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postUserAttribute: PostUserAttribute = (userId, data, config) =>
  client
    .post(join('/account/v1/users', userId, 'attributes'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postUserAttribute;
