import type { Config } from '@farfetch/blackout-client/types';
import type { PickupRescheduleRequests } from './pickupRescheduleRequests.types';

export type GetPickupRescheduleRequests = (
  id: string,
  config?: Config,
) => Promise<PickupRescheduleRequests>;
