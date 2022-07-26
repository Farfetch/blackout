import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import type { Config } from '../types';
import type { TrackingData } from './types';

const POST_TRACKINGS_PATHNAME = '/marketing/v1/trackings';
/**
 * Method responsible for posting data to /trackings endpoint on MKT API.
 *
 * @example
 * ```
 * import \{ postTracking \} from '\@farfetch/blackout-client/omnitracking';
 *
 *  postTracking(\{
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
const postTracking = (data: TrackingData, config?: Config) =>
  client
    .post(POST_TRACKINGS_PATHNAME, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

postTracking.POST_TRACKINGS_PATHNAME = POST_TRACKINGS_PATHNAME;

export default postTracking;
