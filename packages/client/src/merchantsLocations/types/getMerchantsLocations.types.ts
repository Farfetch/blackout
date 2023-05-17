import type { Config } from '../../index.js';
import type { GetMerchantsLocationsQuery } from './getMerchantsLocationsQuery.types.js';
import type { MerchantLocation } from './merchantLocation.types.js';

export type GetMerchantsLocations = (
  query?: GetMerchantsLocationsQuery,
  config?: Config,
) => Promise<MerchantLocation[]>;
