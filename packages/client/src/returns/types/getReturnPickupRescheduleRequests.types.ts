import type { Config } from '../../types';
import type { PickupRescheduleRequests } from './pickupRescheduleRequests.types';

export type GetReturnPickupRescheduleRequests = (
  id: string,
  config?: Config,
) => Promise<PickupRescheduleRequests>;
