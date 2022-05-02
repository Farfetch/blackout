import client, { adaptError } from '../helpers/client';
import type { AxiosRequestConfig } from 'axios';

/**
 * Method responsible for posting data to /analytics endpoint on MKT API.
 *
 * @param data - Payload to be sent on the body of the post request.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @example
 * import \{ postAnalytics \} from '\@farfetch/blackout-client/analyticsService';
 *
 *  postAnalytics(\{
 *       type: '\@farfetch/blackout-client/analytics',
 *       version: '1.0.0.0',
 *       data: \{
 *          type: trackTypes.PAGE,
 *          properties: \{\},
 *          event: pageTypes.HOMEPAGE,
 *          ... More analytics event fields
 *      \}
 *  \});
 *
 * @returns Promise object.
 */
const postAnalytics = (data: object, config?: AxiosRequestConfig) =>
  client
    .post('/marketing/v1/analytics', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postAnalytics;
