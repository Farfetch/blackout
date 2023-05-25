import type { Config, GetBagQuery } from '@farfetch/blackout-client';

export type UseBagOptions = {
  enableAutoFetch?: boolean;
  fetchQuery?: GetBagQuery;
  fetchConfig?: Config;
  internalMetadataList?: string[];
};
