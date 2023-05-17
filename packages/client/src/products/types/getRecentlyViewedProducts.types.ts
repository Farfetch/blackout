import type { Config } from '../../types/index.js';
import type { RecentlyViewedProducts } from './recentlyViewedProducts.types.js';

export type GetRecentlyViewedProductsQuery = {
  page: number;
  pageSize: number;
};

export type GetRecentlyViewedProducts = (
  query?: GetRecentlyViewedProductsQuery,
  config?: Config,
) => Promise<RecentlyViewedProducts>;
