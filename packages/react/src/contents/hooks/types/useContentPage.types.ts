import type { Config } from '@farfetch/blackout-client';

export interface UseContentPageOptions {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
  isCommercePage?: boolean;
}
