import { fetchShipmentTrackingsFactory } from './factories';
import { getShipmentTrackings } from '@farfetch/blackout-client/orders';

/**
 * Fetch all tracking events for the tracking numbers.
 */
export const fetchShipmentTrackings =
  fetchShipmentTrackingsFactory(getShipmentTrackings);
