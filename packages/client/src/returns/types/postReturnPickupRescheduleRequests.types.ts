import type { Config } from '../../types/index.js';
import type { PickupRescheduleRequest } from './pickupRescheduleRequests.types.js';
import type { Return } from './return.types.js';

export type PostReturnPickupRescheduleRequestData = Omit<
  PickupRescheduleRequest,
  'id' | 'status'
>;

export type PostReturnPickupRescheduleRequest = (
  returnId: Return['id'],
  data: PostReturnPickupRescheduleRequestData,
  config?: Config,
) => Promise<number>;
