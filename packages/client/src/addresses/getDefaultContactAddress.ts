import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetDefaultContactAddress } from './types';

/**
 * Responsible for obtaining the user's default contact address.
 *
 * @param userId - Identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getDefaultContactAddress: GetDefaultContactAddress = (userId, config) =>
  client
    .get(
      join('/account/v1/users', userId, 'addresses/preferred/current'),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getDefaultContactAddress;
