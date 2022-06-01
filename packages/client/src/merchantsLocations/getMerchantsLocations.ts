import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetMerchantsLocations } from './types';

/**
 * Method responsible for loading the merchants locations.
 *
 * @param query  - Query with parameters to get the merchants locations.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getMerchantsLocations: GetMerchantsLocations = (query, config) =>
  client
    .get(
      join('/commerce/v1/merchantsLocations', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getMerchantsLocations;
