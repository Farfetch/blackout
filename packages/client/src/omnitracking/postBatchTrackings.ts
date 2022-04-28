import client, { adaptError } from '../helpers/client';
import type { AxiosRequestConfig } from 'axios';

/**
 * Method responsible for posting a batch of data to /batch/trackings endpoint on MKT API.
 *
 * @param data   - Payload to be sent on the body of the post request.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @example
 * import \{ postBatchTrackings \} from '\@farfetch/blackout-client/omnitracking';
 *
 *  postBatchTrackings([
 *      \{
 *          event: 'GenericPageVisited',
 *          correlationId: 'cc0dc41e-f058-40ec-a073-1fe3d56265bb',
 *          tenantId: 16000,
 *          clientId: 16000,
 *          customerId: 'g_123',
 *          parameters: \{\}
 *      \}
 * ]);
 *
 * @returns Promise object.
 */
const postBatchTrackings = (data: Array<object>, config?: AxiosRequestConfig) =>
  client
    .post('/marketing/v1/batch/trackings', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postBatchTrackings;
