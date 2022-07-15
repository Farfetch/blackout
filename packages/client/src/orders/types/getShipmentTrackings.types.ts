import type { Tracking } from './tracking.types';

export type GetShipmentTrackings = (
  trackingCodes: string,
  config?: Record<string, unknown>,
) => Promise<Tracking[]>;
