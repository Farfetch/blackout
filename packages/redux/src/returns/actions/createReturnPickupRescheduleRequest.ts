import { createReturnPickupRescheduleRequestFactory } from './factories';
import { postReturnPickupRescheduleRequest } from '@farfetch/blackout-client';

/**
 * Create pickup reschedule request.
 */
export default createReturnPickupRescheduleRequestFactory(
  postReturnPickupRescheduleRequest,
);
