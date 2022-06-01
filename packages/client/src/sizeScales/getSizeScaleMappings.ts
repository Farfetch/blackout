import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetSizeScaleMappings } from './types';

/**
 * Method responsible for fetching size scale mappings.
 *
 * @param query  - Query with parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getSizeScaleMappings: GetSizeScaleMappings = (query, config) =>
  client
    .get(
      join('/commerce/v1/sizeScaleMappings', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSizeScaleMappings;
