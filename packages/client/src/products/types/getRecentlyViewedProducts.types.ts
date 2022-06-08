import type { Config } from '../../types';
import type { RecentlyViewedProducts } from './recentlyViewedProducts.types';

export type GetRecentlyViewedProductsQuery = {
  page: number;
  pageSize: number;
};

export type GetRecentlyViewedProducts = (
  query?: GetRecentlyViewedProductsQuery,
  config?: Config,
) => Promise<RecentlyViewedProducts>;
