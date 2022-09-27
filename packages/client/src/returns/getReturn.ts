import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetReturn } from './types';

/**
 * Method responsible for obtaining a specific return.
 *
 * @param returnId - Return identifier.
 * @param config   - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getReturn: GetReturn = (returnId, config) =>
  client
    .get(join('/account/v1/returns', returnId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getReturn;
