import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetAddressPredictions } from './types/index.js';

/**
 * Method responsible for getting the predictions.
 *
 * @param text   - String to search for.
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getAddressPredictions: GetAddressPredictions = (text, query, config) =>
  client
    .get(
      join('/account/v1/addressesprediction/', text, {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getAddressPredictions;
