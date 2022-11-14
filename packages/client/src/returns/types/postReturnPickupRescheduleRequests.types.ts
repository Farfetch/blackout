import type { Config } from '../../types';
import type { PickupRescheduleRequest } from './pickupRescheduleRequests.types';
import type { Return } from './return.types';

export type PostReturnPickupRescheduleRequestData = Omit<
  PickupRescheduleRequest,
  'id' | 'status'
>;

export type PostReturnPickupRescheduleRequest = (
  returnId: Return['id'],
  data: PostReturnPickupRescheduleRequestData,
  config?: Config,
) => Promise<number>;
