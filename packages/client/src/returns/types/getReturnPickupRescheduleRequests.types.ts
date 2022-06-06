import type { Config } from '@farfetch/blackout-client/types';
import type { PickupRescheduleRequests } from './pickupRescheduleRequests.types';

export type GetReturnPickupRescheduleRequests = (
  id: string,
  config?: Config,
) => Promise<PickupRescheduleRequests>;
