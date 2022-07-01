import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PatchReturn } from './types';

/**
 * Method responsible for updating the pickup schedule of a return.
 *
 * @param id     - Return identifier.
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchReturn: PatchReturn = (id, data, config) =>
  client
    .patch(join('/account/v1/returns', id), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default patchReturn;
