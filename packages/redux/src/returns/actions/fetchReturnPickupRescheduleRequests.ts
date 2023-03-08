import { fetchReturnPickupRescheduleRequestsFactory } from './factories/index.js';
import { getReturnPickupRescheduleRequests } from '@farfetch/blackout-client';

/**
 * Fetch pickup reschedule requests.
 */
export default fetchReturnPickupRescheduleRequestsFactory(
  getReturnPickupRescheduleRequests,
);
