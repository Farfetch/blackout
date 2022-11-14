import type { Config, Return } from '../..';
import type { ReturnPickupCapability } from './returnPickupCapability.types';

export type GetReturnPickupCapability = (
  returnId: Return['id'],
  pickupDay: string,
  config?: Config,
) => Promise<ReturnPickupCapability>;
