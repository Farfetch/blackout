import type { Config, QuerySearchContents } from '@farfetch/blackout-client';

export interface UseContentsOptions extends QuerySearchContents {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
}
