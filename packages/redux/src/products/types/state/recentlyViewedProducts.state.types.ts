import type {
  RecentlyViewedProducts,
  RecentlyViewedProductsPaginationData,
} from '@farfetch/blackout-client';
import type { StateWithResult } from '../../../types/index.js';

export type RecentlyViewedProductsResult = {
  remote: RecentlyViewedProducts | null | undefined;
  computed: RecentlyViewedProducts['entries'] | null | undefined;
  pagination: RecentlyViewedProductsPaginationData | null | undefined;
};

export type RecentlyViewedState = StateWithResult<RecentlyViewedProductsResult>;
