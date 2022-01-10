import type { PickupCapabilities } from './pickupCapabilities.types';

export type GetPickupCapabilities = (
  id: number,
  pickupDay: string,
  config?: Record<string, unknown>,
) => Promise<PickupCapabilities[]>;
