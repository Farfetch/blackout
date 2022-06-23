import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetSizeScales } from './types';

/**
 * Method responsible for fetching size scales.
 *
 * @param query  - Query with parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getSizeScales: GetSizeScales = (query, config) =>
  client
    .get(
      join('/commerce/v1/sizeScales', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSizeScales;
