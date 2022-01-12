import type {
  BreadCrumb,
  Product,
} from '@farfetch/blackout-client/src/products/types';
import type { Error } from '@farfetch/blackout-client/src/types';
import type {
  GroupedEntriesAdapted,
  ProductEntity,
} from '@farfetch/blackout-redux/src/entities/types';
import type { SizesAdapted } from '@farfetch/blackout-client/src/helpers/adapters/types';

export type UseProductDetails = (id: number) => {
  availableSizes: SizesAdapted;
  breadcrumbs: BreadCrumb[] | undefined;
  error: Error | undefined;
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
