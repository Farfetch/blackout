import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type {
  RecentlyViewedProducts,
  RecentlyViewedProductsEntriesItem,
  RecentlyViewedProductsPaginationData,
} from '@farfetch/blackout-client/src/recentlyViewed/types';

export type State = CombinedState<{
  error: BlackoutError | undefined | null;
  isLoading: boolean;
  result: RecentlyViewedResult;
}>;

export type RecentlyViewedResult = {
  remote: RecentlyViewedProducts | null | undefined;
  computed: RecentlyViewedProductsEntriesItem[] | null | undefined;
  pagination: RecentlyViewedProductsPaginationData | null | undefined;
};
