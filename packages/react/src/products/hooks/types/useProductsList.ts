import type { Error } from '@farfetch/blackout-client/src/types';
import type {
  ListingQuery,
  SetQuery,
} from '@farfetch/blackout-client/src/products/types';
import type {
  ProductEntity,
  ProductsListEntity,
} from '@farfetch/blackout-redux/src/entities/types';

export type ProductsListTypes = {
  LISTING: 'listing';
  SET: 'set';
};

export type UseProductsListParams = {
  query: ListingQuery | SetQuery;
  setProductsListHash?: boolean;
  slug: string;
  type: ProductsListTypes['LISTING'] | ProductsListTypes['SET'];
  useCache?: boolean;
};

export type UseProductsList = ({
  query,
  setProductsListHash,
  slug,
  type,
  useCache,
}: UseProductsListParams) => {
  error: Error | undefined;
  isFetched: boolean | undefined;
  isLoading: boolean | undefined;
  products: ProductEntity[];
  productsListHash: string;
  result: ProductsListEntity;
};
