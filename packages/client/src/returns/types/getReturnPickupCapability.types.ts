import type { Config, Return } from '../../index.js';
import type { ReturnPickupCapability } from './returnPickupCapability.types.js';

export type GetReturnPickupCapability = (
  returnId: Return['id'],
  pickupDay: string,
  config?: Config,
) => Promise<ReturnPickupCapability>;
