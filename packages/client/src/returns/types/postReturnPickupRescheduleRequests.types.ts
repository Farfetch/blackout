import type { Config } from '../../types';
import type { PickupRescheduleRequest } from './pickupRescheduleRequests.types';
import type { Return } from './return.types';

export type PostReturnPickupRescheduleRequest = (
  id: Return['id'],
  data: PickupRescheduleRequest,
  config?: Config,
) => Promise<number>;
