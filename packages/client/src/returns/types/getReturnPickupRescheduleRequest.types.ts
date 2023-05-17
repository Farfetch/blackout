import type { Config } from '../../types/index.js';
import type { PickupRescheduleRequest } from './pickupRescheduleRequests.types.js';
import type { Return } from './return.types.js';

export type GetReturnPickupRescheduleRequest = (
  returnId: Return['id'],
  rescheduleRequestId: string,
  config?: Config,
) => Promise<PickupRescheduleRequest>;
