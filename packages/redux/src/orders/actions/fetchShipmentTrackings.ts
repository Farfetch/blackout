import { fetchShipmentTrackingsFactory } from './factories/index.js';
import { getShipmentTrackings } from '@farfetch/blackout-client';

/**
 * Fetch all tracking events for the tracking numbers.
 */
export default fetchShipmentTrackingsFactory(getShipmentTrackings);
