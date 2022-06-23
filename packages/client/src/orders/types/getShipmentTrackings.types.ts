import type { Config } from '../..';
import type { ShipmentTrackings } from './tracking.types';

export type GetShipmentTrackings = (
  trackingCodes: string,
  config?: Config,
) => Promise<ShipmentTrackings>;
