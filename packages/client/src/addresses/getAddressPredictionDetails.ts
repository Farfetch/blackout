import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetAddressPredictionDetails } from './types';

/**
 * Method responsible for getting the prediction details.
 *
 * @param props  - Object containing predictionId.
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getAddressPredictionDetails: GetAddressPredictionDetails = (
  props,
  query,
  config,
) =>
  client
    .get(
      join('/account/v1/addressesprediction', props?.predictionId, 'address', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
