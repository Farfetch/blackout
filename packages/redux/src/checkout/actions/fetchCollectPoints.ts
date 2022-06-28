import { fetchCollectPointsFactory } from './factories';
import { getCollectPoints } from '@farfetch/blackout-client';

/**
 * Fetch collect points.
 */
export default fetchCollectPointsFactory(getCollectPoints);
