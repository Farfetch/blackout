import { fetchCollectPointsFactory } from './factories/index.js';
import { getCollectPoints } from '@farfetch/blackout-client';

/**
 * Fetch collect points.
 */
export default fetchCollectPointsFactory(getCollectPoints);
