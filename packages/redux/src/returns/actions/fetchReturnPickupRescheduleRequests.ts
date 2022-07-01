import { fetchReturnPickupRescheduleRequestsFactory } from './factories';
import { getReturnPickupRescheduleRequests } from '@farfetch/blackout-client/returns';

/**
 * Fetch pickup reschedule requests.
 */
export const fetchReturnPickupRescheduleRequests =
  fetchReturnPickupRescheduleRequestsFactory(getReturnPickupRescheduleRequests);
