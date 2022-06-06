import type { Config } from '@farfetch/blackout-client/types';
import type { PickupRescheduleRequest } from './pickupRescheduleRequests.types';

export type GetReturnPickupRescheduleRequest = (
  id: string,
  rescheduleRequestId: string,
  config?: Config,
) => Promise<PickupRescheduleRequest>;
