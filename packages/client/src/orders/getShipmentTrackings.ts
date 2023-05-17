import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { GetShipmentTrackings } from './types/index.js';

/**
 * Gets all tracking events based on the tracking numbers.
 *
 * @param trackingCodes - Tracking numbers to check the status on.
 * @param config        - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getShipmentTrackings: GetShipmentTrackings = (trackingCodes, config) =>
  client
    .get(`/account/v1/trackings?trackingNumbers=${trackingCodes}`, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getShipmentTrackings;
