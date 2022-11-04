import type { Config, QueryCommercePages } from '@farfetch/blackout-client';

export interface UseCommercePagesOptions extends QueryCommercePages {
  enableAutoFetch?: boolean;
  strategy?: string;
  fetchConfig?: Config;
}

export enum CommercePagesStrategy {
  Default = 'default',
  Merge = 'merge',
}
