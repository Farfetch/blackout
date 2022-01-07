import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  GetRecentlyViewedProductsData,
  RecentlyViewedProductsPaginationData,
} from '@farfetch/blackout-client/src/recentlyViewed/types';

export type State = CombinedState<{
  error: Error | undefined | null;
  isLoading: boolean;
  result: RecentlyViewedResult;
}>;

export type RecentlyViewedResult = {
  remote: GetRecentlyViewedProductsData | null | undefined;
  computed: GetRecentlyViewedProductsData[] | null | undefined;
  pagination: RecentlyViewedProductsPaginationData | null | undefined;
};
