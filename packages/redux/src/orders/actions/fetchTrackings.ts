import { fetchTrackingsFactory } from './factories';
import { getTrackings } from '@farfetch/blackout-client';

/**
 * Fetch all tracking events for the tracking numbers.
 */
export default fetchTrackingsFactory(getTrackings);
