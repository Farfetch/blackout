import type { Tracking } from './tracking.types';

export type GetTrackings = (
  trackingCodes: string,
  config?: Record<string, unknown>,
) => Promise<Tracking[]>;
