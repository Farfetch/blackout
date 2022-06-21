import type {
  RecentlyViewedProducts,
  RecentlyViewedProductsEntriesItem,
  RecentlyViewedProductsPaginationData,
} from '@farfetch/blackout-client';
import type { StateWithResult } from '../../../types';

type RecentlyViewedProductsResult = {
  remote: RecentlyViewedProducts | null | undefined;
  computed: RecentlyViewedProductsEntriesItem[] | null | undefined;
  pagination: RecentlyViewedProductsPaginationData | null | undefined;
};

export type RecentlyViewedState = StateWithResult<RecentlyViewedProductsResult>;
