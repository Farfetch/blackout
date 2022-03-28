import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PutDefaultPersonalId } from './types';

/**
 * Method responsible for update a personal id.
 *
 * @param userId - Universal identifier of the user.
 * @param data - Object containing personal id data.
 * @param config - Custom configurations to send to the client
 * instance (axios). X-SUMMER-RequestId header is required.
 *
 * @returns Promise that will resolve when the call to
 * the endpoint finishes.
 */
const putDefaultPersonalId: PutDefaultPersonalId = (userId, data, config) =>
  client
    .put(
      join('/account/v1/users/', userId, '/personalIds/default'),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default putDefaultPersonalId;
