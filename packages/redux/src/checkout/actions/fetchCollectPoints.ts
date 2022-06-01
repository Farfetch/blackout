import { fetchCollectPointsFactory } from './factories';
import { getCollectPoints } from '@farfetch/blackout-client/checkout';

/**
 * Fetch collect points.
 */
export default fetchCollectPointsFactory(getCollectPoints);
