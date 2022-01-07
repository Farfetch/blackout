import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  RecentlyViewedProducts,
  RecentlyViewedProductsEntriesItem,
  RecentlyViewedProductsPaginationData,
} from '@farfetch/blackout-client/src/recentlyViewed/types';

export type State = CombinedState<{
  error: Error | undefined | null;
  isLoading: boolean;
  result: RecentlyViewedResult;
}>;

export type RecentlyViewedResult = {
  remote: RecentlyViewedProducts | null | undefined;
  computed: RecentlyViewedProductsEntriesItem[] | null | undefined;
  pagination: RecentlyViewedProductsPaginationData | null | undefined;
};
