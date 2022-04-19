import type { Config } from '@farfetch/blackout-client/types';
import type { PickupRescheduleRequest } from './pickupRescheduleRequests.types';

export type PostPickupRescheduleRequest = (
  id: string,
  data: PickupRescheduleRequest,
  config?: Config,
) => Promise<number>;
