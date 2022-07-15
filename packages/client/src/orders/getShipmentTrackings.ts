import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import type { GetShipmentTrackings } from './types';

/**
 * Gets all tracking events based on the tracking numbers.
 *
 * @param trackingCodes - Tracking numbers to check the status on.
 * @param config        - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getShipmentTrackings: GetShipmentTrackings = (
  trackingCodes,
  config,
) =>
  client
    .get(`/account/v1/trackings?trackingNumbers=${trackingCodes}`, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
