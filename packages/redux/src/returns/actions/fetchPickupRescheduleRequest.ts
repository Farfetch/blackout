import { fetchPickupRescheduleRequestFactory } from './factories';
import { getPickupRescheduleRequest } from '@farfetch/blackout-client/returns';

/**
 * Fetch pickup reschedule request.
 */
export default fetchPickupRescheduleRequestFactory(getPickupRescheduleRequest);
