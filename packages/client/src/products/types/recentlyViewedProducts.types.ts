import type { PagedResponse } from '../../types';

export type RecentlyViewedProducts = PagedResponse<RecentlyViewedProduct>;
export type RecentlyViewedProductsPaginationData = Omit<
  RecentlyViewedProducts,
  'entries'
>;

export type RecentlyViewedProduct = {
  productId: number;
  lastVisitDate: string;
};
