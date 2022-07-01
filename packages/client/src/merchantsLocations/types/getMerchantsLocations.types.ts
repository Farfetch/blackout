import type { Config } from '../..';
import type { GetMerchantsLocationsQuery } from './getMerchantsLocationsQuery.types';
import type { MerchantLocation } from './merchantLocation.types';

export type GetMerchantsLocations = (
  query: GetMerchantsLocationsQuery,
  config?: Config,
) => Promise<MerchantLocation[]>;
