import { fetchShipmentTrackingsFactory } from './factories';
import { getShipmentTrackings } from '@farfetch/blackout-client';

/**
 * Fetch all tracking events for the tracking numbers.
 */
export default fetchShipmentTrackingsFactory(getShipmentTrackings);
