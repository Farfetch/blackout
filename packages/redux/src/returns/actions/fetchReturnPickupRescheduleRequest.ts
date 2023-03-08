import { fetchReturnPickupRescheduleRequestFactory } from './factories/index.js';
import { getReturnPickupRescheduleRequest } from '@farfetch/blackout-client';

/**
 * Fetch pickup reschedule request.
 */
export default fetchReturnPickupRescheduleRequestFactory(
  getReturnPickupRescheduleRequest,
);
