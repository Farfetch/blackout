import type {
  BlackoutError,
  BreadCrumb,
  Product,
} from '@farfetch/blackout-client';
import type {
  GroupedEntriesAdapted,
  ProductEntity,
  SizesAdapted,
} from '@farfetch/blackout-redux';

export type UseProductDetails = (id: number) => {
  availableSizes: SizesAdapted;
  breadcrumbs: BreadCrumb[] | undefined;
  error: BlackoutError | undefined;
  groupedEntries: GroupedEntriesAdapted;
  isDuplicated: boolean | undefined;
  isFetched: boolean;
  isHydrated: boolean | undefined;
  isInBag: boolean;
  isLoading: boolean | undefined;
  isOneSize: boolean | undefined;
  isOutOfStock: boolean | undefined;
  labelsPrioritized: Product['result']['labels'];
  product: ProductEntity | undefined;
  promotions: Product['result']['promotions'];
};
