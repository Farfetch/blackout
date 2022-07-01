import type { Config } from '../..';
import type { Trackings } from './tracking.types';

export type GetTrackings = (
  trackingCodes: string,
  config?: Config,
) => Promise<Trackings>;
