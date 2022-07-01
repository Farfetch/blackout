import { fetchReturnPickupRescheduleRequestFactory } from './factories';
import { getReturnPickupRescheduleRequest } from '@farfetch/blackout-client/returns';

/**
 * Fetch pickup reschedule request.
 */
export const fetchReturnPickupRescheduleRequest =
  fetchReturnPickupRescheduleRequestFactory(getReturnPickupRescheduleRequest);
