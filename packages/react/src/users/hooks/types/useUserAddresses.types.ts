import type { Config } from '@farfetch/blackout-client';

export type UseUserAddressesOptions = {
  enableAutoFetch?: boolean;
  manageDefaultsOnRemoveAddress?: boolean;
  fetchConfig?: Config;
};
