import { fetchPickupRescheduleRequestsFactory } from './factories';
import { getPickupRescheduleRequests } from '@farfetch/blackout-client/returns';

/**
 * Fetch pickup reschedule requests.
 */
export default fetchPickupRescheduleRequestsFactory(
  getPickupRescheduleRequests,
);
