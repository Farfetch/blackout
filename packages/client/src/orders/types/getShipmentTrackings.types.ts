import type { Config } from '../../index.js';
import type { ShipmentTrackings } from './tracking.types.js';

export type GetShipmentTrackings = (
  trackingCodes: string,
  config?: Config,
) => Promise<ShipmentTrackings>;
