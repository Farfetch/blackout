import { fetchTrackingsFactory } from './factories';
import { getTrackings } from '@farfetch/blackout-client/orders';

/**
 * Fetch all tracking events for the tracking numbers.
 *
 * @memberof module:orders/actions
 *
 * @name getTrackings
 *
 * @type {GetTrackingsThunkFactory}
 */
export default fetchTrackingsFactory(getTrackings);
