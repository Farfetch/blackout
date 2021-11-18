import client, { adaptError } from '../../../../helpers/client';

/**
 * Method responsible for posting data to /analytics endpoint on MKT API.
 *
 * @memberof module:AnalyticsService/client
 *
 * @param {object} data - Payload to be sent on the body of the post request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @example
 * import { postAnalytics } from '@farfetch/blackout-core/analytics/integrations/AnalyticsService/client';
 *
 *  postAnalytics({
 *       type: '@farfetch/blackout-core/analytics',
 *       version: '1.0.0.0',
 *       data: {
 *          type: trackTypes.PAGE,
 *          properties: {},
 *          event: pageTypes.HOMEPAGE,
 *          ... More analytics event fields
 *      }
 *  });
 *
 * @returns {Promise} Promise object.
 */
const postAnalytics = (data, config) =>
  client
    .post('/marketing/v1/analytics', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postAnalytics;
