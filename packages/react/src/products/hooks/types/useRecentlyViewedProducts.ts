import type {
  Config,
  GetRecentlyViewedProductsQuery,
} from '@farfetch/blackout-client';
import type { ProductEntity } from '@farfetch/blackout-redux';

export type UseRecentlyViewedProductsOptions = {
  excludeProductId?: ProductEntity['id'];
  fetchConfig?: Config;
  enableAutoFetch?: boolean;
  fetchQuery?: GetRecentlyViewedProductsQuery;
};
