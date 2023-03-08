import { createReturnPickupRescheduleRequestFactory } from './factories/index.js';
import { postReturnPickupRescheduleRequest } from '@farfetch/blackout-client';

/**
 * Create pickup reschedule request.
 */
export default createReturnPickupRescheduleRequestFactory(
  postReturnPickupRescheduleRequest,
);
