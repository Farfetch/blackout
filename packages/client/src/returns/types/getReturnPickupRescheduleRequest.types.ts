import type { Config } from '../../types';
import type { PickupRescheduleRequest } from './pickupRescheduleRequests.types';
import type { Return } from './return.types';

export type GetReturnPickupRescheduleRequest = (
  returnId: Return['id'],
  rescheduleRequestId: string,
  config?: Config,
) => Promise<PickupRescheduleRequest>;
