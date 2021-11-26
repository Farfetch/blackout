import client, { adaptError } from '../helpers/client';

export const POST_TRACKINGS_PATHNAME = '/marketing/v1/trackings';
/**
 * Method responsible for posting data to /trackings endpoint on MKT API.
 *
 * @memberof module:Omnitracking/client
 *
 * @param {object} data - Payload to be sent on the body of the post request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @example
 * import { postTrackings } from '@farfetch/blackout-client/omnitracking';
 *
 *  postTrackings({
 *       event: 'GenericPageVisited',
 *       correlationId: 'cc0dc41e-f058-40ec-a073-1fe3d56265bb',
 *       tenantId: 16000,
 *       clientId: 16000,
 *       customerId: 'g_123',
 *       parameters: {}
 *   });
 *
 * @returns {Promise} Promise object.
 */
const postTrackings = (data, config) =>
  client
    .post(POST_TRACKINGS_PATHNAME, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postTrackings;
