import type { CommercePagesRankingStrategy } from '@farfetch/blackout-redux';
import type { Config, QueryCommercePages } from '@farfetch/blackout-client';

export interface UseCommercePagesOptions extends QueryCommercePages {
  enableAutoFetch?: boolean;
  strategy?: CommercePagesRankingStrategy;
  fetchConfig?: Config;
}
