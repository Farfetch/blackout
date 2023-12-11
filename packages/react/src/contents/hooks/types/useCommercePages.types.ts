import type { CommercePagesRankingStrategy } from '@farfetch/blackout-redux';
import type { Config, QueryCommercePages } from '@farfetch/blackout-client';

export interface UseCommercePagesOptions extends QueryCommercePages {
  slug: string;
  enableAutoFetch?: boolean;
  strategy?: CommercePagesRankingStrategy;
  fetchConfig?: Config;
}
