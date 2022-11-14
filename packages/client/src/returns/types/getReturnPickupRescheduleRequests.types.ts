import type { Config } from '../../types';
import type { PickupRescheduleRequests } from './pickupRescheduleRequests.types';
import type { Return } from './return.types';

export type GetReturnPickupRescheduleRequests = (
  returnId: Return['id'],
  config?: Config,
) => Promise<PickupRescheduleRequests>;
