import { createPickupRescheduleRequestFactory } from './factories';
import { postPickupRescheduleRequest } from '@farfetch/blackout-client/returns';

/**
 * Create pickup reschedule request.
 */
export default createPickupRescheduleRequestFactory(
  postPickupRescheduleRequest,
);
