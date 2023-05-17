import type { Config } from '../../types/index.js';
import type { PickupRescheduleRequests } from './pickupRescheduleRequests.types.js';
import type { Return } from './return.types.js';

export type GetReturnPickupRescheduleRequests = (
  returnId: Return['id'],
  config?: Config,
) => Promise<PickupRescheduleRequests>;
