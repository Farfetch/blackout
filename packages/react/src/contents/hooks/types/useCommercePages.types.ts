import type {
  CommercePagesStrategy,
  Config,
  QueryCommercePages,
} from '@farfetch/blackout-client';

export interface UseCommercePagesOptions extends QueryCommercePages {
  enableAutoFetch?: boolean;
  strategy?: CommercePagesStrategy;
  fetchConfig?: Config;
}
