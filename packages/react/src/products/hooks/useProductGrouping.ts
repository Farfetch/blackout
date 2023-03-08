import {
  buildQueryStringFromObject,
  fetchProductGrouping,
  getProductGrouping,
  getProductGroupingError,
  isProductGroupingFetched,
  isProductGroupingLoading,
  type ProductEntity,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseProductGroupingOptions } from './types/index.js';

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
  const queryString = fetchQuery && buildQueryStringFromObject(fetchQuery);
  const hash = queryString ? queryString : '!all';

  const error = useSelector((state: StoreState) =>
    getProductGroupingError(state, productId, hash),
  );
  const isLoading = useSelector((state: StoreState) =>
    isProductGroupingLoading(state, productId, hash),
  );
  const isFetched = useSelector((state: StoreState) =>
    isProductGroupingFetched(state, productId, hash),
  );

  const productGrouping = useSelector((state: StoreState) =>
    getProductGrouping(state, productId, hash),
  );

  const shouldLoadProductGrouping = enableAutoFetch && !isLoading && !isFetched;

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
