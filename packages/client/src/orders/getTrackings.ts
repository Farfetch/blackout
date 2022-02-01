import client, { adaptError } from '../helpers/client';
import type { GetTrackings } from './types';

/**
 * Gets all tracking events based on the tracking numbers.
 *
 * @function getTrackings
 * @memberof module:orders/client
 *
 * @param {string} trackingCodes - Tracking numbers to check the status on.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getTrackings: GetTrackings = (trackingCodes, config) =>
  client
    .get(`/account/v1/trackings?trackingNumbers=${trackingCodes}`, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getTrackings;
