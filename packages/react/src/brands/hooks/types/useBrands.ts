import type { Config, GetBrandsQuery } from '@farfetch/blackout-client';

export type UseBrandsOptions = {
  enableAutoFetch?: boolean;
  useCache?: boolean;
  query?: GetBrandsQuery;
  fetchConfig?: Config;
};
