import type { Config } from '@farfetch/blackout-client';

export type UseUserOptions = {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
  useLegacyActions?: boolean;
};
