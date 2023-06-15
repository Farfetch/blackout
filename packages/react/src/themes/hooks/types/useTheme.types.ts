import type { Config } from '@farfetch/blackout-client';

export type UseThemeOptions = {
  code: string;
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
  version?: number;
};
