import type { PickupCapabilities } from './pickupCapabilities.types';

export type GetReturnPickupCapabilities = (
  id: number,
  pickupDay: string,
  config?: Record<string, unknown>,
) => Promise<PickupCapabilities>;
