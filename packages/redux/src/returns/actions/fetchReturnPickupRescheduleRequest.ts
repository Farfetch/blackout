import { fetchReturnPickupRescheduleRequestFactory } from './factories';
import { getReturnPickupRescheduleRequest } from '@farfetch/blackout-client/returns';

/**
 * Fetch pickup reschedule request.
 */
export default fetchReturnPickupRescheduleRequestFactory(
  getReturnPickupRescheduleRequest,
);
