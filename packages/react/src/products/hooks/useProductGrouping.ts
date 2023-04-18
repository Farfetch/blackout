import {
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

  const error = useSelector((state: StoreState) =>
    getProductGroupingError(state, productId, fetchQuery),
  );
  const isLoading = useSelector((state: StoreState) =>
    isProductGroupingLoading(state, productId, fetchQuery),
  );
  const isFetched = useSelector((state: StoreState) =>
    isProductGroupingFetched(state, productId, fetchQuery),
  );

  const productGrouping = useSelector((state: StoreState) =>
    getProductGrouping(state, productId, fetchQuery),
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
