import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import type { AxiosRequestConfig } from 'axios';
import type { TrackingData } from './types';

const POST_TRACKINGS_PATHNAME = '/marketing/v1/trackings';
/**
 * Method responsible for posting data to /trackings endpoint on MKT API.
 *
 * @example
 * ```
 * import \{ postTrackings \} from '\@farfetch/blackout-client/omnitracking';
 *
 *  postTrackings(\{
 *       event: 'GenericPageVisited',
 *       correlationId: 'cc0dc41e-f058-40ec-a073-1fe3d56265bb',
 *       tenantId: 16000,
 *       clientId: 16000,
 *       customerId: 'g_123',
 *       parameters: \{\}
 *   \});
 *
 * ```
 *
 * @param data   - Payload to be sent on the body of the post request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise object.
 */
const postTrackings = (data: TrackingData, config?: AxiosRequestConfig) =>
  client
    .post(POST_TRACKINGS_PATHNAME, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

postTrackings.POST_TRACKINGS_PATHNAME = POST_TRACKINGS_PATHNAME;

export default postTrackings;
