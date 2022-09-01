import {
  buildQueryStringFromObject,
  fetchProductGrouping,
  getProductGrouping,
  getProductGroupingError,
  isProductGroupingFetched,
  isProductGroupingLoading,
  ProductEntity,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { UseProductGroupingOptions } from './types';

const useProductGrouping = (
  productId: ProductEntity['id'],
  options: UseProductGroupingOptions = {},
) => {
  const {
    fetchConfig,
    enableAutoFetch = true,
    fetchQuery = { pageIndex: 1 },
  } = options;
  const fetchAction = useAction(fetchProductGrouping);

  const error = useSelector((state: StoreState) =>
    getProductGroupingError(state, productId),
  );
  const isLoading = useSelector((state: StoreState) =>
    isProductGroupingLoading(state, productId),
  );
  const isFetched = useSelector((state: StoreState) =>
    isProductGroupingFetched(state, productId),
  );
  const queryString = fetchQuery && buildQueryStringFromObject(fetchQuery);
  const hash = queryString ? queryString : '!all';
  const productGrouping = useSelector((state: StoreState) =>
    getProductGrouping(state, productId, hash),
  );

  const shouldLoadProductGrouping =
    enableAutoFetch && !isLoading && !error && !productGrouping;

  const fetch = useCallback(
    () => fetchAction(productId, fetchQuery, fetchConfig),
    [fetchAction, fetchConfig, productId, fetchQuery],
  );

  useEffect(() => {
    shouldLoadProductGrouping && fetch();
  }, [fetch, shouldLoadProductGrouping]);

  return {
    error,
    isFetched,
    isLoading,
    data: productGrouping,
    actions: {
      refetch: fetch,
    },
  };
};

export default useProductGrouping;
