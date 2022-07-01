import { fetchReturnPickupRescheduleRequestFactory } from './factories';
import { getReturnPickupRescheduleRequest } from '@farfetch/blackout-client';

/**
 * Fetch pickup reschedule request.
 */
export default fetchReturnPickupRescheduleRequestFactory(
  getReturnPickupRescheduleRequest,
);
