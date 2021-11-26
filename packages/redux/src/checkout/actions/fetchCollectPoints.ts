import { fetchCollectPointsFactory } from './factories';
import { getCollectPoints } from '@farfetch/blackout-client/checkout';

/**
 * Fetch collect points.
 *
 * @memberof module:checkout/actions
 *
 * @name fetchCollectPoints
 *
 * @type {FetchCollectPointsThunkFactory}
 */
export default fetchCollectPointsFactory(getCollectPoints);
