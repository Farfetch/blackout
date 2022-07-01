import type { Config } from '../..';
import type { PickupCapabilities } from './pickupCapabilities.types';

export type GetReturnPickupCapabilities = (
  id: number,
  pickupDay: string,
  config?: Config,
) => Promise<PickupCapabilities>;
