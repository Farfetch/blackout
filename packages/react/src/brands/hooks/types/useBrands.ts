import type { BrandsQuery, Config } from '@farfetch/blackout-client';

export type UseBrandsOptions = {
  enableAutoFetch?: boolean;
  useCache?: boolean;
  setBrandsHash?: boolean;
  query?: BrandsQuery;
  fetchConfig?: Config;
};
