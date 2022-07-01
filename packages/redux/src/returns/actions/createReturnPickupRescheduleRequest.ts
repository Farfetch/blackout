import { createReturnPickupRescheduleRequestFactory } from './factories';
import { postReturnPickupRescheduleRequest } from '@farfetch/blackout-client/returns';

/**
 * Create pickup reschedule request.
 */
export const createReturnPickupRescheduleRequest =
  createReturnPickupRescheduleRequestFactory(postReturnPickupRescheduleRequest);
