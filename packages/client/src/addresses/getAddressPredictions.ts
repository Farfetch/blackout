import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type {
  GetAddressPredictions,
  GetAddressPredictionsQuery,
} from './types';

const getReqUrl = (params: {
  text: string;
  query?: GetAddressPredictionsQuery;
}): string =>
  join('/account/v1/addressesprediction/', params.text, {
    query: params.query,
  });

/**
 * Method responsible for getting the predictions.
 *
 * @param text   - String to search for.
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getAddressPredictions: GetAddressPredictions = (
  text,
  query,
  config,
) =>
  client
    .get(getReqUrl({ text, query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
